import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatModule } from 'src/app/shared/mat/mat.module';

import { ConsultaTabelaDePrecoComponent } from './consulta-tabela-de-preco.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ConsultaTabelaDePrecoComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    PipesModule
  ]
})
export class ConsultaTabelaDePrecoModule { }
