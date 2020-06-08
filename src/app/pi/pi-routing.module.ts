import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoXClienteComponent } from './servico-x-cliente/servico-x-cliente.component';
import { ColetasXEntregasComponent } from './coletas-x-entregas/coletas-x-entregas.component';
import { CustosDeProducaoComponent } from './custos-de-producao/custos-de-producao.component';


const routes: Routes = [
    {
        path: 'saldo-pecas',
        component: ColetasXEntregasComponent
    },
    {
        path: 'servico-cliente',
        component: ServicoXClienteComponent
    },
    {
        path: 'custos-de-producao',
        component: CustosDeProducaoComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiRoutingModule { }