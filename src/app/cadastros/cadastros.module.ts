import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CadastroPecaComponent } from './cadastro-peca/cadastro-peca.component';
import { CadastroTabelaDePrecoComponent } from './cadastro-tabela-de-preco/cadastro-tabela-de-preco.component';

import { MatModule } from '../shared/mat/mat.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { ContatosComponent } from './cadastro-cliente/contatos/contatos.component';
import { InfoPrincipaisComponent } from './cadastro-cliente/info-principais/info-principais.component';
import { InfoFaturamentoComponent } from './cadastro-cliente/info-faturamento/info-faturamento.component';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    CadastroClienteComponent,
    CadastroPecaComponent,
    CadastroTabelaDePrecoComponent,
    ContatosComponent,
    InfoPrincipaisComponent,
    InfoFaturamentoComponent
  ],
  imports: [
    CadastrosRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    LoadingSpinnerModule,
    PipesModule,
    DirectivesModule
  ]
})
export class CadastrosModule { }
