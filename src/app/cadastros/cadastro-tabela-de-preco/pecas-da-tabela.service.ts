import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PecaDaTabelaDePrecos } from 'src/app/interfaces/tabela-de-preco';

@Injectable({
  providedIn: 'root'
})
export class PecasDaTabelaService {

  private _pecas: PecaDaTabelaDePrecos[] = [];

  constructor() { }

  addPeca(peca: PecaDaTabelaDePrecos) {
    if(this.pecaJaCadastrada(peca)) {
      this.alterarPreco(peca);
    } else {
      this._pecas.push(peca)
    }
  }

  removerPeca(peca: PecaDaTabelaDePrecos) {

  }

  private pecaJaCadastrada(peca: PecaDaTabelaDePrecos) {
    var bool = false;
    this._pecas.forEach(pecaTab => {
      if(pecaTab.nomePeca === peca.nomePeca) bool = true;
    })
    return bool;
  }

  private alterarPreco(peca: PecaDaTabelaDePrecos) {
    this._pecas.forEach((pecaTab, index) => {
      if(pecaTab.nomePeca === peca.nomePeca) {
        pecaTab.precoPeca = peca.precoPeca
      };
    })
  }

  get pecas() {
    return this._pecas;
  }

  limparPecas() {
    this._pecas.length = 0;
  }
}
