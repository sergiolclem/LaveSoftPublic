import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiAdresses } from 'src/environments/environment.prod';
import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const FATURAMENTO = apiAdresses.faturamento;

@Injectable({
  providedIn: 'root'
})
export class RelatorioFaturamentoService {

  constructor(
    private http: HttpClient
  ) { }

  getRelatorioServicos(filtro: FiltroFirestore) {
    var url = ROOT + API + FATURAMENTO + '/relatorio-servicos';
    return this.http.post(url, filtro) as Observable<any>;
  }

  getDetalhesFaturamento(filtro: FiltroFirestore) {
    var url = ROOT + API + FATURAMENTO + '/detalhes-faturamento';
    return this.http.post(url, filtro) as Observable<any>;
  }

  getTotalizadores(filtro: FiltroFirestore) {
    var url = ROOT + API + FATURAMENTO + '/totalizadores';
    return this.http.post(url, filtro) as Observable<any>;
  }
}
