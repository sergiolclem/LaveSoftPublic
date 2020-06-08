import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfOuCnpj]'
})
export class CpfOuCnpjDirective {

  @HostListener('input') valorDigitado() {
    var el: HTMLInputElement = this.elementRef.nativeElement;
    var inputValue = this.limpar(el);
    inputValue.length <= 11 ? this.configurarCpf(inputValue) :
      this.configurarCnpj(inputValue);
  };

  constructor(
    private elementRef: ElementRef,
    private ngControl: NgControl
  ) { }

  configurarCpf(inputValue: string) {
    inputValue = inputValue.replace(/(\d{3})(\d)/, '$1.$2');
    inputValue = inputValue.replace(/(\d{3})(\d)/, '$1.$2');
    inputValue = inputValue.replace(/(\d{3})(\d)/, '$1-$2');
    
    this.ngControl.control.setValue(inputValue)
  }
  
  configurarCnpj(inputValue: string) {
    inputValue = inputValue.replace(/(\d{2})(\d)/, '$1.$2');
    inputValue = inputValue.replace(/(\d{3})(\d)/, '$1.$2');
    inputValue = inputValue.replace(/(\d{3})(\d)/, '$1/$2');
    inputValue = inputValue.replace(/(\d{4})(\d)/, '$1-$2');
    inputValue = inputValue.replace(/(-\d{2})(\d*)/, '$1');
    
    this.ngControl.control.setValue(inputValue)
  }

  limpar(el: HTMLInputElement) {
    return el.value.replace(/\D/g,'');
  }
}
