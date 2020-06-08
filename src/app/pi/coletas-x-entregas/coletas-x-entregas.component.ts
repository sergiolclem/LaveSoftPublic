import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { DadosGraficoService } from 'src/app/services/dados-grafico/dados-grafico.service';
import { FiltroService } from 'src/app/services/filtro/filtro.service';

@Component({
  selector: 'app-coletas-x-entregas',
  templateUrl: './coletas-x-entregas.component.html',
  styleUrls: ['./coletas-x-entregas.component.css']
})
export class ColetasXEntregasComponent implements OnInit, OnDestroy {

  public series;
  public rotulos;

  public graficoPronto: boolean = false;
  public contemPeca: boolean = true;

  private inscricaoFiltro: Subscription;

  public tipoGrafico = 'bar';
  public legendasGrafico = true;
  public opcoesGrafico = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{ stacked: true }]
    }
  };

  constructor(
    private filtroService: FiltroService,
    private dadosGraficoService: DadosGraficoService
  ) { }
  
  ngOnInit() {
    this.configurarDados();
  }

  configurarDados() {
    this.inscricaoFiltro = this.filtroService.filtro$.pipe(switchMap(filtro => {
      return this.dadosGraficoService.getDadosGrafico(filtro)
    }))
    .subscribe(dataset => {
      this.filtrarDados(dataset)
    })
  }

  filtrarDados(dataset) {
    this.filtroService.peca$.subscribe(pecaId => {
      if(pecaId) {
        this.prepararExibicao(dataset, pecaId)      
      } else {
        this.graficoPronto = false;
      }
    })
  }

  prepararExibicao(dataset, pecaId) {
    if(dataset.series[pecaId]) {
      this.rotulos = dataset.rotulosGraph;
      this.series = dataset.series[pecaId];
      this.graficoPronto = true;
      this.contemPeca = true;
    } else {
      this.contemPeca = false;
    }
  }

  ngOnDestroy() {
    this.inscricaoFiltro.unsubscribe();
  }
}