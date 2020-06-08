import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import * as moment from "moment";

import { ConsultaClienteService } from '../consulta-cliente.service';
import { InfoProcesso } from 'src/app/interfaces/cliente';
import { MovimentacoesService } from 'src/app/services/conexao-firestore/movimentacoes.service';
import { Registro } from 'src/app/interfaces/registro';
import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';
import { DetalhesRegistroDeClienteComponent } from './detalhes-registro-de-cliente/detalhes-registro-de-cliente.component'

@Component({
  selector: 'app-info-processo',
  templateUrl: './info-processo.component.html',
  styleUrls: ['./info-processo.component.css']
})
export class InfoProcessoComponent implements OnInit {

  public infoProcesso$: Observable<InfoProcesso>;
  public ultEntradas$: Observable<Registro[]>
  public ultSaidas$: Observable<Registro[]>

  constructor(
    private consClienteService: ConsultaClienteService,
    private movimentacoesService: MovimentacoesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.infoProcesso$ = this.consClienteService.infoProcesso$;
    this.consClienteService.clienteId$.subscribe(id => {
      this.configurarRegistros(id);      
    })
  }

  configurarRegistros(id: string) {
    this.ultEntradas$ = this.movimentacoesService.movimentacoesPorFiltros(this.gerarFiltro('entrada', id))
    this.ultSaidas$ = this.movimentacoesService.movimentacoesPorFiltros(this.gerarFiltro('saida', id))
  }

  gerarFiltro(tipoRegistro: string, id: string) {
    return {
      limit: 5,
      where: [
        {chave: 'cabecalho.clienteId', operador: '==', valor: id},
        {chave: 'metaDados.tipoRegistro', operador: '==', valor: tipoRegistro}
      ]
    } as FiltroFirestore
  }
  
  detalharRegistro(registro: Registro) {
    this.dialog.open(DetalhesRegistroDeClienteComponent, {
      data: registro,
      minWidth: "60%"
    })
  }
}
