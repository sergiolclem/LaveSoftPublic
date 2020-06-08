import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroTabelaDePrecoComponent } from './cadastro-tabela-de-preco/cadastro-tabela-de-preco.component';
import { CadastroPecaComponent } from './cadastro-peca/cadastro-peca.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';


const routes: Routes = [
  {
    path: 'cadastro-cliente',
    component: CadastroClienteComponent
  },
  {
    path: 'cadastro-peca',
    component: CadastroPecaComponent
  },
  {
    path: 'cadastro-tabela-de-preco',
    component: CadastroTabelaDePrecoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
