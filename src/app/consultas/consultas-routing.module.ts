import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaRegistroComponent } from './consulta-registro/consulta-registro.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';
import { ConsultaTabelaDePrecoComponent } from './consulta-tabela-de-preco/consulta-tabela-de-preco.component';

const routes: Routes = [
    {
        path: 'consulta-tabela-de-preco',
        component: ConsultaTabelaDePrecoComponent
    },
    {
        path: 'consulta-cliente',
        component: ConsultaClienteComponent
    },
    {
        path: 'consulta-registro',
        component: ConsultaRegistroComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }