import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaClienteModule } from './consulta-cliente/consulta-cliente.module';
import { ConsultaRegistroModule } from './consulta-registro/consulta-registro.module';
import { ConsultaTabelaDePrecoModule } from './consulta-tabela-de-preco/consulta-tabela-de-preco.module';
import { ConsultasRoutingModule } from './consultas-routing.module';

@NgModule({
  declarations: [ ],
  imports: [
    ConsultasRoutingModule,
    CommonModule,
    ConsultaClienteModule,
    ConsultaRegistroModule,
    ConsultaTabelaDePrecoModule
  ]
})
export class ConsultasModule { }
