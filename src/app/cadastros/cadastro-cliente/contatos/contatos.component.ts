import { Component, OnInit } from '@angular/core';
import { CadastroDeClienteFormService } from 'src/app/services/forms/cadastro-de-cliente-form.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  constructor(
    public cadClienteForm: CadastroDeClienteFormService
  ) { }

  ngOnInit(): void {
  }

}
