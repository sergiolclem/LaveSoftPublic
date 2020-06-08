import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { FormService } from 'src/app/services/forms/form.service';
import { ConsultaClienteService } from './consulta-cliente.service';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  public clientes: Cliente[];
  public listaClientesCarregada: boolean = false;

  constructor(
    private clientesService: ClienteService,
    private consClienteService: ConsultaClienteService,
    public formService: FormService
  ) { }

  ngOnInit(): void {
    this.clientesService.clientes.subscribe(clientes => {
      this.clientes = clientes;
      this.listaClientesCarregada = true;
    });
  }

  selecionarCliente() {
    this.consClienteService.definirCliente(this.formService.formCliente.get('nomeCliente').value);
  }
}
