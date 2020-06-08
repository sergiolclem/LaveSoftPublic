import { Component, OnInit } from '@angular/core';

import { CadastroDeClienteFormService } from 'src/app/services/forms/cadastro-de-cliente-form.service';

@Component({
  selector: 'app-info-principais',
  templateUrl: './info-principais.component.html',
  styleUrls: ['./info-principais.component.css']
})
export class InfoPrincipaisComponent implements OnInit {

  constructor(
    public cadClienteForm: CadastroDeClienteFormService
  ) { }

  ngOnInit(): void { }
}
