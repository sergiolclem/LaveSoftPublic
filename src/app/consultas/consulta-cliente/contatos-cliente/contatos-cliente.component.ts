import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ConsultaClienteService } from '../consulta-cliente.service';
import { Contato } from 'src/app/interfaces/cliente';
import { AddContatoComponent } from './add-contato/add-contato.component';

@Component({
  selector: 'app-contatos-cliente',
  templateUrl: './contatos-cliente.component.html',
  styleUrls: ['./contatos-cliente.component.css']
})
export class ContatosClienteComponent implements OnInit {

  public contatos$: Observable<Contato[]>;

  constructor(
    private consClienteService: ConsultaClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.contatos$ = this.consClienteService.contatos$;
  }

  addContato() {
    this.dialog.open(AddContatoComponent)
  }
}
