import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroClienteDataComponent } from './filtro-cliente-data/filtro-cliente-data.component';
import { FiltroPecaClienteDataComponent } from './filtro-peca-cliente-data/filtro-peca-cliente-data.component';
import { MatModule } from '../mat/mat.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    FiltroClienteDataComponent,
    FiltroPecaClienteDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    LoadingSpinnerModule
  ],
  exports: [
    FiltroClienteDataComponent,
    FiltroPecaClienteDataComponent
  ]
})
export class FiltrosMovimentacoesModule { }
