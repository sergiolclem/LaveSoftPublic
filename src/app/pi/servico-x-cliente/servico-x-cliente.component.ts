import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { DadosTabelaService } from 'src/app/services/dados-tabela/dados-tabela.service';
import { FiltroService } from 'src/app/services/filtro/filtro.service';

@Component({
  selector: 'app-servico-x-cliente',
  templateUrl: './servico-x-cliente.component.html',
  styleUrls: ['./servico-x-cliente.component.css']
})
export class ServicoXClienteComponent implements OnInit, OnDestroy {

  public rotulosTabela: string[];
  public linhasTabela;

  public linhasCarregadas = false;

  private inscricaoFiltro: Subscription;

  constructor(
    private filtroService: FiltroService,
    private dadosTabela: DadosTabelaService
  ) { }

  ngOnInit(): void {
    this.inscricaoFiltro = this.filtroService.filtro$.pipe(switchMap(filtro => {
      this.linhasCarregadas = false;
      return this.dadosTabela.getDadosTabela(filtro)
    }))
    .subscribe(res => {
      this.rotulosTabela = res.rotulosTabela;
      this.linhasTabela = res.linhasTabela;
      this.linhasCarregadas = true;
    })
  }

  valorColuna(elemento, coluna) {
    return elemento[coluna]
  }

  ngOnDestroy() {
    this.inscricaoFiltro.unsubscribe();
  }
}
