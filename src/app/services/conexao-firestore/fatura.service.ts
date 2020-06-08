import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Fatura } from 'src/app/interfaces/fatura';
import { apiAdresses } from 'src/environments/environment.prod';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const FATURAS = apiAdresses.faturas

@Injectable({
  providedIn: 'root'
})
export class FaturaService {

  constructor(
    private http: HttpClient
  ) { }

  get faturas() {
    let url = ROOT + API + FATURAS;
    return this.http.get(url) as Observable<Fatura[]>;
  }

  addFatura(fatura: Fatura) {
    let url = ROOT + API + FATURAS + '/add';
    return this.http.post(url, fatura);
  }
  
  deletarFatura(id: string) {
    let url = ROOT + API + FATURAS + '/del';
    return this.http.post(url, { id });
  }
  
  alterarStatusFatura(id: string, estado: boolean, parcelaId?: number) {
    let url = ROOT + API + FATURAS + '/mark-as-paid';
    let reqBody: any = { id, estado };
    if(parcelaId !== undefined) reqBody.parcelaId = parcelaId;
    return this.http.post(url, reqBody);
  }
}
