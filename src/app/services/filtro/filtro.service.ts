import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FiltroFirestore, FiltroWhere } from '../../interfaces/filtros-filestore'

type tipoFiltroData = 'inicial' | 'final';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private _filtro$: BehaviorSubject<FiltroFirestore> = new BehaviorSubject(null);
  private _peca$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  /**
   * 
   * @param formFields Object containing query params for Firestore API
   * 
   * @returns Object ready for query on Firestore API
   */
  configurarFiltro(formFields) {
    var novoFiltro: FiltroFirestore = {
      where: [],
      orderBy: []
    };
    if(formFields.cliente) novoFiltro.where.push(this.filtrarCliente(formFields.cliente));
    if(formFields.tipoRegistro) novoFiltro.where.push(this.filtrarTipoRegistro(formFields.tipoRegistro));
    if(formFields.dataFinal) novoFiltro.where.push(this.filtrarData(formFields.dataFinal, 'final'))
    if(formFields.dataInicial) novoFiltro.where.push(this.filtrarData(formFields.dataInicial, 'inicial'))

    this._filtro$.next(novoFiltro);
  }

  configurarPeca(pecaId: string) {
    this._peca$.next(pecaId);
  }

  get filtro$() {
    return this._filtro$;
  }

  get peca$() {
    return this._peca$
  }

  /**
   * Clears all filters information
   */
  limparFiltro() {
    this._filtro$.next(null);
  }

  private filtrarData(data, tipo: tipoFiltroData) {
    var oper = tipo == 'inicial' ? '>=' : '<=';
    return {
      chave: 'cabecalho.data',
      operador: oper,
      valor: data
    } as FiltroWhere;
  }

  private filtrarCliente(cliente: string) {
    return {
      chave: 'cabecalho.clienteId',
      operador: '==',
      valor: cliente
    } as FiltroWhere;
  }

  private filtrarTipoRegistro(tipoRegistro: string) {
    return {
      chave: 'metaDados.tipoRegistro',
      operador: '==',
      valor: tipoRegistro
    } as FiltroWhere;
  }
}
