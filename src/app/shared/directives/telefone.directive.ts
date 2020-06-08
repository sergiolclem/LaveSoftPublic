import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTelefone]'
})
export class TelefoneDirective {

  @HostListener('input') telefoneDigitado() {
    var el: HTMLInputElement = this.el.nativeElement;
    var inputValue = this.limpar(el);
    inputValue.length <= 10 ? this.configTelPadrao(inputValue) :
      this.configTelDigExtra(inputValue)
  }

  constructor(
    private el: ElementRef,
    private ngControl: NgControl
  ) { }

  configTelPadrao(inputValue: string) {
    inputValue = inputValue.replace(/(\d{2})(\d)/, '$1 $2');
    inputValue = inputValue.replace(/(\d{4})(\d)/, '$1 - $2');
    
    this.ngControl.control.setValue(inputValue);
  }

  configTelDigExtra(inputValue: string) {
    inputValue = inputValue.replace(/(\d{2})(\d)/, '$1 $2');
    inputValue = inputValue.replace(/(\s\d)(\d)/, '$1 $2');
    inputValue = inputValue.replace(/(\d{4})(\d)/, '$1 - $2');
    inputValue = inputValue.replace(/(\d{4})(\d)/, '$1');
    
    this.ngControl.control.setValue(inputValue);
  }

  limpar(el: HTMLInputElement) {
    return el.value.replace(/\D/g, '');
  }
}
