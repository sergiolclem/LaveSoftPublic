import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Registro } from 'src/app/interfaces/registro';

@Component({
  selector: 'app-detalhes-registro-de-cliente',
  templateUrl: './detalhes-registro-de-cliente.component.html',
  styleUrls: ['./detalhes-registro-de-cliente.component.css']
})
export class DetalhesRegistroDeClienteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Registro
  ) { }

  ngOnInit(): void {
  }
}
