import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Cliente } from '../../../interfaces/cliente';
import { Peca } from '../../../interfaces/peca';
import { FiltroService } from 'src/app/services/filtro/filtro.service';
import { ClienteService } from '../../../services/conexao-firestore/cliente.service';
import { PecasService } from '../../../services/conexao-firestore/pecas.service';

@Component({
  selector: 'app-filtro-peca-cliente-data',
  templateUrl: './filtro-peca-cliente-data.component.html',
  styleUrls: ['./filtro-peca-cliente-data.component.css']
})
export class FiltroPecaClienteDataComponent implements OnInit, OnDestroy {

  public pecas: Peca[];
  public clientes: Cliente[];
  public formData: FormGroup;
  public formPeca: FormGroup;

  public pecasCarregadas: boolean = false;
  public clientesCarregados: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private pecasService: PecasService,
    private filtroService: FiltroService
  ) { }

  ngOnInit(): void {
    this.configurarPecas();
    this.configurarClientes();
    this.iniciarForm();
    this.ratrearPeca();
    this.rastrearFiltro();
  }

  configurarPecas() {
    this.pecasService.pecas.subscribe(pecas => {
      this.pecas = pecas;
      this.pecasCarregadas = true;
    })
  }

  configurarClientes() {
    this.clienteService.clientes.subscribe(clientes => {
      this.clientes = clientes;
      this.clientesCarregados = true;
    })
  }

  iniciarForm() {
    this.formPeca = new FormGroup({
      peca: new FormControl(),
    })
    this.formData = new FormGroup({
      cliente: new FormControl(),
      dataInicial:  new FormControl(),
      dataFinal: new FormControl()
    })
  }
z
  ratrearPeca() {
    this.formPeca.get('peca').valueChanges.subscribe(pecaId => this.filtroService.configurarPeca(pecaId))
  }

  ngOnDestroy() {
    this.limparFiltros();
  }

  rastrearFiltro() {
    this.formData.valueChanges.subscribe(rawV => {
      this.filtroService.configurarFiltro(rawV);
    })
  }

  limparFiltros() {
    this.filtroService.limparFiltro();
    this.formData.reset();
    this.rastrearFiltro();
  }
}
