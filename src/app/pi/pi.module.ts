import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatModule } from '../shared/mat/mat.module';
import { ChartsModule } from 'ng2-charts';

import { ColetasXEntregasComponent } from './coletas-x-entregas/coletas-x-entregas.component';
import { CustosDeProducaoComponent } from './custos-de-producao/custos-de-producao.component';
import { ServicoXClienteComponent } from './servico-x-cliente/servico-x-cliente.component';
import { FiltrosMovimentacoesModule } from '../shared/filtros-movimentacoes/filtros-movimentacoes.module';
import { PiRoutingModule } from './pi-routing.module';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    ColetasXEntregasComponent,
    CustosDeProducaoComponent,
    ServicoXClienteComponent
  ],
  imports: [
    PiRoutingModule,
    CommonModule,
    MatModule,
    FiltrosMovimentacoesModule,
    ChartsModule,
    LoadingSpinnerModule
  ]
})
export class PiModule { }
