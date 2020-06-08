import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente, InfoPrincipais, Contato, InfoProcesso, InfoFaturamento } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ConsultaClienteService {

  private _cliente$: BehaviorSubject<Cliente> = new BehaviorSubject(null);
  private _infoPrincipais$: BehaviorSubject<InfoPrincipais> = new BehaviorSubject(null);
  private _contatos$: BehaviorSubject<Contato[]> = new BehaviorSubject(null);
  private _infoProcesso$: BehaviorSubject<InfoProcesso> = new BehaviorSubject(null)
  private _infoFaturamento$: BehaviorSubject<InfoFaturamento> = new BehaviorSubject(null);
  private _clienteId$: BehaviorSubject<string> = new BehaviorSubject(null)

  constructor() { }

  definirCliente(cliente: Cliente) {
    this._cliente$.next(cliente);
    this._infoPrincipais$.next(cliente.infoPrincipais);
    this._contatos$.next(cliente.contatos);
    this._infoProcesso$.next(cliente.infoProcesso);
    this._infoFaturamento$.next(cliente.infoFaturamento);
    this._clienteId$.next(cliente.metaDados.id)
  }

  get cliente$() {
    return this._cliente$;
  }

  get infoPrincipais$() { 
    return this._infoPrincipais$;
  }

  get contatos$() {
    return this._contatos$;
  }

  get infoProcesso$() {
    return this._infoProcesso$;
  }

  get infoFaturameto$() {
    return this._infoFaturamento$;
  }

  get clienteId$() {
    return this._clienteId$;
  }
}
