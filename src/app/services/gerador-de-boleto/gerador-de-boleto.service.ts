import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BoletoGerencia } from 'src/app/interfaces/boleto-gerencia';
import { Observable } from 'rxjs';
import { apiAdresses } from 'src/environments/environment.prod';

const ROOT = apiAdresses.root;
const GERENCIANET = apiAdresses.gerencianet;
const GERAR_BOLETO = '/gerar-boleto';

@Injectable({
  providedIn: 'root'
})
export class GeradorDeBoletoService {

  constructor(
    private http: HttpClient
  ) { }

  gerarBoletoOneStep(paymentInfo: BoletoGerencia) {

    let headers = { 
      "Content-Type": "application/json",
      "Accept": "*/*"
    }

    let url = apiAdresses

    return this.http.post(ROOT + GERENCIANET + GERAR_BOLETO, paymentInfo, {headers: headers}) as Observable<any>;
  }
}
