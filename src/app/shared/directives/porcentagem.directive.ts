import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPorcentagem]'
})
export class PorcentagemDirective {

  @HostListener('input') onInput() {
    var el: HTMLInputElement = this.elementRef.nativeElement;
    var inputValue = this.limpar(el);
    this.configurarInput(inputValue);
  }

  constructor(
    private elementRef: ElementRef,
    private ngControl: NgControl
  ) { }

  ngOnInit() {
    this.onInput();
  }

  configurarInput(inputValue: string) {
    inputValue = inputValue.replace(/(^\d{1,2})/, ' % $1');
    inputValue = inputValue.replace(/(\d{2})(\d*$)/, '$1');

    this.ngControl.control.setValue(inputValue);
  }

  limpar(el: HTMLInputElement) {
    return el.value.replace(/\D/g, '').replace(/^0+/,'');
  }
}
