import { Component, OnInit } from '@angular/core';
import { ConsultaRegistroService } from '../consulta-registro.service';
import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-detalhes-registro',
  templateUrl: './detalhes-registro.component.html',
  styleUrls: ['./detalhes-registro.component.css']
})
export class DetalhesRegistroComponent implements OnInit {

  public registro: Registro;

  constructor(
    private consRegistro: ConsultaRegistroService
  ) { }

  ngOnInit(): void {
    this.consRegistro.registroID.subscribe(reg => {
      this.registro = reg;
    })
  }
}
