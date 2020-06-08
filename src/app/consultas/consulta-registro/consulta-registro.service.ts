import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro';

const id = '0HfOam8RpT3QLO3U3NnU'

@Injectable({
  providedIn: 'root'
})
export class ConsultaRegistroService {

  private _registroID: BehaviorSubject<Registro> = new BehaviorSubject(null)

  constructor() { }

  definirID(reg: Registro) {
    this._registroID.next(reg);
  }

  get registroID() {
    return this._registroID;
  }
}
