import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { ConsultaClienteService } from '../../consulta-cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';


@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.component.html',
  styleUrls: ['./add-contato.component.css']
})
export class AddContatoComponent implements OnInit {

  public cliente$: Observable<Cliente>;
  public formContato: FormGroup;

  constructor(
    private consClienteService: ConsultaClienteService,
    public formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.cliente$ = this.consClienteService.cliente$;
    this.inicializarForm();
    this.addTelefone();
  }

  inicializarForm() {
    this.formContato = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      email: new FormControl(''),
      observacoes: new FormControl(''),
      telefones: this.formBuilder.array([])
    })
  }

  get telefonesForms() {
    return this.formContato.get('telefones') as FormArray
  }

  addTelefone() {
    const telefone = this.formBuilder.group({
      numero: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      observacoes: new FormControl()
    })

    this.telefonesForms.push(telefone);
  }

  removerTelefone(i: number) {
    this.telefonesForms.removeAt(i);
  }

  addContato(cliente: Cliente) {
    cliente.contatos.push(this.formContato.getRawValue())
    this.clienteService.atualizarCliente(cliente).subscribe(res => {
      console.log(res)
    })
  }
}
