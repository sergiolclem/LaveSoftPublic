import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatModule } from 'src/app/shared/mat/mat.module';

import { ConsultaClienteComponent } from './consulta-cliente.component';
import { InfoProcessoComponent } from './info-processo/info-processo.component';
import { InfoPrincipaisComponent } from './info-principais/info-principais.component';
import { EditarInfoComponent } from './info-principais/editar-info/editar-info.component';
import { InfoFaturamentoComponent } from './info-faturamento/info-faturamento.component';
import { EditarCondicaoDeFaturamentoComponent } from './info-faturamento/editar-condicao-de-faturamento/editar-condicao-de-faturamento.component';
import { EditarCondicaoDePagamentoComponent } from './info-faturamento/editar-condicao-de-pagamento/editar-condicao-de-pagamento.component';
import { EditarTabelaDePrecoComponent } from './info-faturamento/editar-tabela-de-preco/editar-tabela-de-preco.component';
import { ContatosClienteComponent } from './contatos-cliente/contatos-cliente.component';
import { AddContatoComponent } from './contatos-cliente/add-contato/add-contato.component';
import { DetalhesRegistroDeClienteComponent } from './info-processo/detalhes-registro-de-cliente/detalhes-registro-de-cliente.component';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ConsultaClienteComponent,    
    InfoProcessoComponent, 
    InfoPrincipaisComponent,
    EditarInfoComponent,
    InfoFaturamentoComponent,
    EditarCondicaoDeFaturamentoComponent,
    EditarCondicaoDePagamentoComponent,
    EditarTabelaDePrecoComponent,
    ContatosClienteComponent,
    AddContatoComponent,
    DetalhesRegistroDeClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    LoadingSpinnerModule,
    PipesModule
  ],
  exports: [
  ]
})
export class ConsultaClienteModule { }
