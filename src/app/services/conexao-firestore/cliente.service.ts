import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiAdresses } from '../../../environments/environment.prod'
import { Cliente } from '../../interfaces/cliente';

const ROOT = apiAdresses.root;
const API = apiAdresses.firebase;
const CLIENTES = apiAdresses.clientes;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  get clientes() {
    var url = ROOT + API + CLIENTES;
    return this.http.get(url) as Observable<Cliente[]>;
  }
  
  getCliente(id: string) {
    var url = ROOT + API + CLIENTES + `/${id}`;
    return this.http.get(url) as Observable<Cliente>;
  }

  atualizarCliente(cliente: Cliente) {
    var url = ROOT + API + CLIENTES + '/update';
    return this.http.post(url, cliente);
  }

  addCliente(cliente: Cliente) {
    var url = ROOT + API + CLIENTES + '/add';
    return this.http.post(url, cliente) as Observable<string>;
  }
}
