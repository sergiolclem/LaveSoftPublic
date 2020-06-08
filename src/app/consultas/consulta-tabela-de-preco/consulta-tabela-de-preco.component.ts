import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TabelasDePrecoService } from 'src/app/services/conexao-firestore/tabelas-de-preco.service';
import { TabelaDePreco } from 'src/app/interfaces/tabela-de-preco';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-consulta-tabela-de-preco',
  templateUrl: './consulta-tabela-de-preco.component.html',
  styleUrls: ['./consulta-tabela-de-preco.component.css']
})
export class ConsultaTabelaDePrecoComponent implements OnInit {

  public tabelasDePreco$: Observable<TabelaDePreco[]>;
  public tabelaSelecionada: TabelaDePreco;

  constructor(
    public formService: FormService,
    private tabPrecoService: TabelasDePrecoService
  ) { }

  ngOnInit(): void {
    this.formService.initializeFormTabela();
    this.tabelasDePreco$ = this.tabPrecoService.tabelas;
    this.selecionarTabela();
  }

  selecionarTabela() {
    this.formService.formTabela.get('nomeTabela')
      .valueChanges.subscribe(tab => {
        this.tabelaSelecionada = tab;
      })
  }
}
