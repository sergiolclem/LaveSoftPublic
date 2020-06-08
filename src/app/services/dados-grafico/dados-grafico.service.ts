import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiAdresses } from 'src/environments/environment.prod';
import { FiltroFirestore } from 'src/app/interfaces/filtros-filestore';

const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const PI = apiAdresses.pi;

@Injectable({
  providedIn: 'root'
})
export class DadosGraficoService {

  constructor(private http: HttpClient) { }

  getDadosGrafico(filtro: FiltroFirestore) {
    var url = ROOT + API + PI + '/in-out-graph';
    return this.http.post(url, filtro)
  }
}
