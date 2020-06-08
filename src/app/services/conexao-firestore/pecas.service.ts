import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiAdresses } from '../../../environments/environment.prod'
import { Peca } from 'src/app/interfaces/peca';

// Constantes
const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const PECAS = apiAdresses.pecas;

@Injectable({
  providedIn: 'root'
})
export class PecasService {

  constructor(
    private http:HttpClient
  ) { }

  get pecas() {
    var url = ROOT + API + PECAS;
    return this.http.get(url) as Observable<Peca[]>
  }
}
