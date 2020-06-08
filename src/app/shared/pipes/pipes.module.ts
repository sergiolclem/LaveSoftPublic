import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealPipe } from './real.pipe';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';

@NgModule({
  declarations: [
    RealPipe,
    TimestampToDatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RealPipe,
    TimestampToDatePipe
  ]
})
export class PipesModule { }
