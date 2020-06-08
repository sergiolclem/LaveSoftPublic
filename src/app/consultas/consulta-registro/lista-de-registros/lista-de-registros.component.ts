import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { Registro } from 'src/app/interfaces/registro';
import { ConsultaRegistroService } from '../consulta-registro.service';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { MovimentacoesService } from 'src/app/services/conexao-firestore/movimentacoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-de-registros',
  templateUrl: './lista-de-registros.component.html',
  styleUrls: ['./lista-de-registros.component.css']
})
export class ListaDeRegistrosComponent implements OnInit, OnDestroy {

  public registros: Registro[];
  public listaRegCarregada: boolean = false;

  public inscricaoFiltro: Subscription;

  constructor(
    private consRegService: ConsultaRegistroService,
    private filtrosService: FiltroService,
    private movService: MovimentacoesService
  ) { }

  ngOnInit(): void {
    this.inscricaoFiltro = this.filtrosService.filtro$.pipe(switchMap(filtro => {
      this.listaRegCarregada = false;
      return this.movService.movimentacoesPorFiltros(filtro)
    }))
    .subscribe(regs => {
      this.registros = regs;
      this.listaRegCarregada = true;
    })
  }

  definirID(reg: Registro) {
    this.consRegService.definirID(reg)
  }

  ngOnDestroy() {
    this.inscricaoFiltro.unsubscribe();
  }
}
