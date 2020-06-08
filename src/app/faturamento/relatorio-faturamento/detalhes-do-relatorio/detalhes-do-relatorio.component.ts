import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { RelatorioFaturamentoService } from 'src/app/services/relatorio-faturamento/relatorio-faturamento.service';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';
import { AuxiliarFaturamentoComponent } from '../auxiliar-faturamento/auxiliar-faturamento.component';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';

interface DetalheFaturamento {
  numeroRegistro: number;
  data: string;
  valor: number;
  foiFaturado: boolean;
  id: string;
}

@Component({
  selector: 'app-detalhes-do-relatorio',
  templateUrl: './detalhes-do-relatorio.component.html',
  styleUrls: ['./detalhes-do-relatorio.component.css']
})
export class DetalhesDoRelatorioComponent implements OnInit, OnDestroy {

  public detalhesCarregados: boolean = false;
  public loadingSpinner: boolean = false;

  private inscricaoFiltroSwitchMap: Subscription;

  public cliente: Cliente;
  public detalhesFaturamento: DetalheFaturamento[];
  public cabecalhoTabela = [
    'numeroRegistro',
    'foiFaturado',
    'data',
    'valor'
  ];

  constructor(
    private filtroService: FiltroService,
    private relFatService: RelatorioFaturamentoService,
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.configurarDetalhes();
  }

  configurarDetalhes() {
    this.inscricaoFiltroSwitchMap = this.filtroService.filtro$.pipe(switchMap(filtro => {
      this.loadingSpinner = true;
      return this.configurarDadosRelatorio(filtro)
    }))
      .subscribe(bool => {
        this.detalhesCarregados = bool;
        this.loadingSpinner = false;
      })
  }

  filtroDeCliente(filtro: FiltroFirestore) {
    let id: string = '';
    if (filtro) {
      let filtroDeCliente = filtro.where.find(wh => wh.chave === 'cabecalho.clienteId');
      id = filtroDeCliente ? filtroDeCliente.valor as string : '';
    }
    return id;
  }


  async configurarDadosRelatorio(filtro: FiltroFirestore) {
    let bool: boolean = false;
    if (filtro && this.filtroDeCliente(filtro)) 
      bool = await this.configurarClienteEDetalhes(filtro);
    return bool;
  }

  async configurarClienteEDetalhes(filtro: FiltroFirestore) {
    let bool = false;
    try {
      await this.configurarCliente(filtro);
      await this.configurarDetalhesFaturamento(filtro);
      bool = true;
    } catch (error) {
      bool = false;
    }
    return bool;
  }

  async configurarCliente(filtro: FiltroFirestore) {
    let clienteId = this.filtroDeCliente(filtro);
    this.cliente = await this.clienteService.getCliente(clienteId).toPromise()
  }

  async configurarDetalhesFaturamento(filtro: FiltroFirestore) {
    this.detalhesFaturamento = await this.relFatService.getDetalhesFaturamento(filtro).toPromise();
  }

  getContagem() {
    return this.detalhesFaturamento.length;
  }

  getTotal() {
    return this.detalhesFaturamento.map(det => det.valor).reduce((acc, value) => acc + value, 0);
  }

  faturar() {
    this.dialog.open(AuxiliarFaturamentoComponent, {
      data: {
        detalhesFaturamento: this.detalhesFaturamento,
        cliente: this.cliente
      }
    })
  }

  ngOnDestroy(): void {
    this.inscricaoFiltroSwitchMap.unsubscribe();
  }
}
