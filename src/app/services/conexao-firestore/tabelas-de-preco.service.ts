import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiAdresses } from '../../../environments/environment.prod'
import { TabelaDePreco } from 'src/app/interfaces/tabela-de-preco';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const TABS = apiAdresses.tabelasDePreco;

@Injectable({
  providedIn: 'root'
})
export class TabelasDePrecoService {

  constructor(
    private http: HttpClient
  ) { }

  get tabelas() {
    var url = ROOT + API + TABS;
    return this.http.get(url) as Observable<TabelaDePreco[]>
  }

  get tabelaPadrao() {
    var url = ROOT + API + TABS + '/tab-padrao';
    return this.http.get(url) as Observable<TabelaDePreco>;
  }

  adicionarTabela(tabela: TabelaDePreco) {
    var url = ROOT + API + TABS + '/add'
    return this.http.post(url, tabela).toPromise() as Promise<string>;
  }
}
