import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash'

import { TabelasDePrecoService } from 'src/app/services/conexao-firestore/tabelas-de-preco.service';
import { TabelaDePreco } from 'src/app/interfaces/tabela-de-preco';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente, TabelaPrecoCliente } from 'src/app/interfaces/cliente';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';

@Component({
  selector: 'app-editar-tabela-de-preco',
  templateUrl: './editar-tabela-de-preco.component.html',
  styleUrls: ['./editar-tabela-de-preco.component.css']
})
export class EditarTabelaDePrecoComponent implements OnInit {

  public formTabelaPreco: FormGroup;
  public tabelasDePreco$: Observable<TabelaDePreco[]>;

  constructor(
    private tabsPrecoService: TabelasDePrecoService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) { }

  ngOnInit(): void {
    this.tabelasDePreco$ = this.tabsPrecoService.tabelas;
    this.formTabelaPreco = new FormGroup({ nomeTabelaPreco: new FormControl('', Validators.required) })
  }

  alterarTabela() {
    var clienteAtualizado = _.cloneDeep(this.data)
    
    var tabelaSelecionada = this.formTabelaPreco.get('nomeTabelaPreco').value as TabelaDePreco;
    
    var tabelaPreco: TabelaPrecoCliente = {
      nome: tabelaSelecionada.nomeTabela,
      id: tabelaSelecionada.id,
      dataAlteracao: new Date()
    }
    
    clienteAtualizado.infoFaturamento.tabelaPreco = tabelaPreco;
    
    this.clienteService.atualizarCliente(clienteAtualizado).subscribe(res => {
      console.log(res)
    })
  }
}
