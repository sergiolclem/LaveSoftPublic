import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaturasComponent } from './faturas/faturas.component';
import { RelatorioFaturamentoComponent } from './relatorio-faturamento/relatorio-faturamento.component';

const routes: Routes = [
    {
        path: 'relatorio-faturamento',
        component: RelatorioFaturamentoComponent
    },
    {
        path: 'faturas',
        component: FaturasComponent
    }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaturamentoRoutingModule { }