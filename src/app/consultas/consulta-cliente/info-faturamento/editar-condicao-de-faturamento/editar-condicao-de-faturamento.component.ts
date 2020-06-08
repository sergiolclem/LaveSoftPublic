import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';

@Component({
  selector: 'app-editar-condicao-de-faturamento',
  templateUrl: './editar-condicao-de-faturamento.component.html',
  styleUrls: ['./editar-condicao-de-faturamento.component.css']
})
export class EditarCondicaoDeFaturamentoComponent implements OnInit {

  public condFatForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.condFatForm = new FormGroup({
      condFaturamento: new FormControl('', Validators.required)
    })
  }

  salvarCondPagamento() {
    var clienteAtualizado = _.cloneDeep(this.data);
    clienteAtualizado.infoFaturamento.condicaoFaturamento = this.condFatForm.get('condFaturamento').value;

    this.clienteService.atualizarCliente(clienteAtualizado).subscribe(res => {
      console.log(res)
    })
  }
}
