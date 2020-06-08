import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { FiltroService } from 'src/app/services/filtro/filtro.service';

@Component({
  selector: 'app-filtro-cliente-data',
  templateUrl: './filtro-cliente-data.component.html',
  styleUrls: ['./filtro-cliente-data.component.css']
})
export class FiltroClienteDataComponent implements OnInit, OnDestroy {

  public clientes: Cliente[];
  public formData: FormGroup;
  public clientesCarregados: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private filtroService: FiltroService
  ) { }

  ngOnInit(): void {
    this.configurarClientes();
    this.iniciarForm();
    this.rastrearFiltro();
    this.filtroInicial();
  }

  configurarClientes() {
    this.clienteService.clientes.subscribe(clientes => {
      this.clientes = clientes;
      this.clientesCarregados = true;
    })
  }

  iniciarForm() {
    this.formData = new FormGroup({
      cliente: new FormControl(),
      tipoRegistro: new FormControl(),
      dataInicial:  new FormControl(),
      dataFinal: new FormControl()
    })
  }

  rastrearFiltro() {
    this.formData.valueChanges.subscribe(rawV => {
      this.filtroService.configurarFiltro(rawV);
    })
  }

  filtroInicial() {
    this.formData.get('tipoRegistro').setValue('entrada');
  }

  limparFiltros() {
    this.filtroService.limparFiltro();
    this.formData.reset();
  }

  ngOnDestroy() {
    this.limparFiltros();
  }
}
