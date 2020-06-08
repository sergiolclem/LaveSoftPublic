import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {

  transform(value: number): string {
    let moeda = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return moeda;
  }
}
