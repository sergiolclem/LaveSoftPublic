import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { InfoPrincipais, Cliente } from 'src/app/interfaces/cliente';
import { ConsultaClienteService } from '../consulta-cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarInfoComponent } from './editar-info/editar-info.component';

@Component({
  selector: 'app-info-principais',
  templateUrl: './info-principais.component.html',
  styleUrls: ['./info-principais.component.css']
})
export class InfoPrincipaisComponent implements OnInit {

  public infoPrincipais$: Observable<InfoPrincipais>;

  constructor(
    private consClienteService: ConsultaClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.infoPrincipais$ = this.consClienteService.infoPrincipais$;
  }

  editarInfo() {
    this.dialog.open(EditarInfoComponent)
  }
}
