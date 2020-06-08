import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appReal]'
})
export class RealDirective implements OnInit {

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
    inputValue = inputValue.replace(/(^\d{1}$)/, 'R$ 0,0$1');
    inputValue = inputValue.replace(/(^\d{2}$)/, 'R$ 0,$1');
    inputValue = inputValue.replace(/(\d+)(\d{2}$)/, 'R$ $1,$2');
    inputValue = inputValue.replace(/(\d+)(\d{3})/, '$1.$2');

    this.ngControl.control.setValue(inputValue);
  }

  limpar(el: HTMLInputElement) {
    return el.value.replace(/\D/g, '').replace(/^0+/,'');
  }
}
