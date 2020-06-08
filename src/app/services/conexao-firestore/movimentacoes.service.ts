import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiAdresses } from 'src/environments/environment.prod';
import { Registro } from '../../interfaces/registro';
import { FiltroFirestore } from '../../interfaces/filtros-filestore';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const REG = apiAdresses.registros;

@Injectable({
  providedIn: 'root'
})
export class MovimentacoesService {

  constructor(
    private http: HttpClient
  ) { }

  movimentacoesPorFiltros(filtros?: FiltroFirestore) {
    var url = ROOT + API + REG;
    var urlFiltro = url + '/filtrar';
    return filtros ? this.http.post(urlFiltro, filtros) as Observable<Registro[]>
      : this.http.get(url) as Observable<Registro[]>
  }
}
