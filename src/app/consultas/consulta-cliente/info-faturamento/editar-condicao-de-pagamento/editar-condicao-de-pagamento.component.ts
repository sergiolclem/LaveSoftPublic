import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';

@Component({
  selector: 'app-editar-condicao-de-pagamento',
  templateUrl: './editar-condicao-de-pagamento.component.html',
  styleUrls: ['./editar-condicao-de-pagamento.component.css']
})
export class EditarCondicaoDePagamentoComponent implements OnInit {

  public condPagForm: FormGroup

  constructor(
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente 
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.condPagForm = new FormGroup({
      formaPagamento: new FormControl('', Validators.required),
      prazoPagamento: new FormControl('', Validators.required)
    })
  }

  salvarCondPagamento() {
    var cliente = _.cloneDeep(this.data);
    
    cliente.infoFaturamento.condicaoPagamento = {
      formaPagamento: this.condPagForm.get('formaPagamento').value,
      prazo: this.condPagForm.get('prazoPagamento').value
    }
    
    this.clienteService.atualizarCliente(cliente).subscribe(res => {
      console.log(res)
    })
  }
}
