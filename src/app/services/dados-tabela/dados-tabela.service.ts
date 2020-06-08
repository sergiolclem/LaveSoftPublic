import { Injectable } from '@angular/core';
import { apiAdresses } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const PI = apiAdresses.pi;

@Injectable({
  providedIn: 'root'
})
export class DadosTabelaService {

  constructor(
    private http: HttpClient
  ) { }

  getDadosTabela(filtro: FiltroFirestore) {
    var url = ROOT + API + PI + '/resumo-servicos';
    return this.http.post(url, filtro) as Observable<any>;
  }
}
