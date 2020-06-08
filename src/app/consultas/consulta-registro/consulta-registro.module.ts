import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/shared/mat/mat.module';

import { DetalhesRegistroComponent } from './detalhes-registro/detalhes-registro.component';
import { ListaDeRegistrosComponent } from './lista-de-registros/lista-de-registros.component';
import { ConsultaRegistroComponent } from './consulta-registro.component';
import { FiltrosMovimentacoesModule } from 'src/app/shared/filtros-movimentacoes/filtros-movimentacoes.module';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    ConsultaRegistroComponent,
    DetalhesRegistroComponent,
    ListaDeRegistrosComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatModule,
    FiltrosMovimentacoesModule,
    LoadingSpinnerModule,
    PipesModule
  ]
})
export class ConsultaRegistroModule { }
