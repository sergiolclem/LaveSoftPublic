import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { GeradorPdfService } from './gerador-pdf.service';

@Component({
  selector: 'app-gerador-de-relatorios',
  templateUrl: './gerador-de-relatorios.component.html',
  styleUrls: ['./gerador-de-relatorios.component.css']
})
export class GeradorDeRelatoriosComponent implements OnInit, OnDestroy {

  public relatorioPronto = false;
  public loadingSppiner = false;
  private inscricaoFiltroSwitchMap: Subscription;

  constructor(
    private filtroService: FiltroService,
    private pdfService: GeradorPdfService
  ) { }

  ngOnInit(): void {
    this.configurarRelatorio();
  }

  configurarRelatorio() {
    this.inscricaoFiltroSwitchMap = this.filtroService.filtro$.pipe(switchMap(filtro => {
      this.loadingSppiner = true
      this.relatorioPronto = false;
      return this.pdfService.configurarRelatorio(filtro);
    }))
    .subscribe(bool => {
      this.relatorioPronto = bool;
      this.loadingSppiner = false;
    })
  }
  
  gerarRelatorio() {
    this.pdfService.gerarRelatorio()
  }

  ngOnDestroy() {
    this.inscricaoFiltroSwitchMap.unsubscribe();
  }
}
