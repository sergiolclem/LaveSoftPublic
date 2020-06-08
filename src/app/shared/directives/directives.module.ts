import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfOuCnpjDirective } from './cpf-ou-cnpj.directive';
import { TelefoneDirective } from './telefone.directive';
import { RealDirective } from './real.directive';
import { PorcentagemDirective } from './porcentagem.directive';

@NgModule({
  declarations: [
    CpfOuCnpjDirective,
    TelefoneDirective,
    RealDirective,
    PorcentagemDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfOuCnpjDirective,
    TelefoneDirective,
    RealDirective,
    PorcentagemDirective
  ]
})
export class DirectivesModule { }
