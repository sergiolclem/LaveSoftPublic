import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../shared/mat/mat.module';

import { FaturasComponent } from './faturas/faturas.component';
import { AuxiliarFaturamentoComponent } from './relatorio-faturamento/auxiliar-faturamento/auxiliar-faturamento.component';
import { RelatorioFaturamentoComponent } from './relatorio-faturamento/relatorio-faturamento.component';
import { FiltrosMovimentacoesModule } from '../shared/filtros-movimentacoes/filtros-movimentacoes.module';
import { FaturamentoRoutingModule } from './faturamento-routing.module';
import { DetalhesFaturaComponent } from './faturas/detalhes-fatura/detalhes-fatura.component';
import { ConfirmacaoBoletoComponent } from './faturas/detalhes-fatura/confirmacao-boleto/confirmacao-boleto.component';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { GeradorDeRelatoriosComponent } from './relatorio-faturamento/gerador-de-relatorios/gerador-de-relatorios.component';
import { DetalhesDoRelatorioComponent } from './relatorio-faturamento/detalhes-do-relatorio/detalhes-do-relatorio.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [
    FaturasComponent,
    RelatorioFaturamentoComponent,
    AuxiliarFaturamentoComponent,
    DetalhesFaturaComponent,
    ConfirmacaoBoletoComponent,
    GeradorDeRelatoriosComponent,
    DetalhesDoRelatorioComponent
  ],
  imports: [
    FaturamentoRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    FiltrosMovimentacoesModule,
    LoadingSpinnerModule,
    LoadingSpinnerModule,
    PipesModule,
    DirectivesModule
  ]
})
export class FaturamentoModule { }
