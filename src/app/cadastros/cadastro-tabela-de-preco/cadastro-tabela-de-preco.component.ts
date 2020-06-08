import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PecaDaTabelaDePrecos, TabelaDePreco } from 'src/app/interfaces/tabela-de-preco';
import { CadastroDeTabelaDePrecoFormService } from 'src/app/services/forms/cadastro-de-tabela-de-preco-form.service';
import { TabelasDePrecoService } from 'src/app/services/conexao-firestore/tabelas-de-preco.service';

const CADASTRANDO = 'Cadastrando tabela de preço';
const CADASTRADO = 'Tabela cadastrada com sucesso';

@Component({
  selector: 'app-cadastro-tabela-de-preco',
  templateUrl: './cadastro-tabela-de-preco.component.html',
  styleUrls: ['./cadastro-tabela-de-preco.component.css']
})
export class CadastroTabelaDePrecoComponent implements OnInit {

  public cadTabForm: FormGroup;
  public formPronto: boolean = false;
  public tabelaPadrao: Observable<TabelaDePreco>;

  constructor(
    public cadTabFormService: CadastroDeTabelaDePrecoFormService,
    private tabService: TabelasDePrecoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.tabelaPadrao = this.tabService.tabelaPadrao;
  }

  async criarFormulario() {
    this.cadTabForm = await this.cadTabFormService.criarForm();
    this.formPronto = true;
  }

  get pecasArray() {
    return this.cadTabFormService.pecasArray;
  }

  get pecas() {
    return this.cadTabFormService.pecas;
  }

  cadastrarTabela() {
    if (this.haPecas()) {
      let cadastrando = this.snackBar.open(CADASTRANDO);
      let novaTabela = this.configurarTabela();
      this.tabService.adicionarTabela(novaTabela)
        .then(() => {
          this.router.navigate(['consultas', 'consulta-tabela-de-preco']);
          cadastrando.dismiss();
          this.snackBar.open(CADASTRADO, '', { duration: 3000 });
        });
    } else {
      this.snackBar.open('Nenhum preço cadastrado!', '', { duration: 2000 })
    }
  }

  haPecas() {
    let haPecas: boolean = false;
    this.cadTabForm.get('pecas').value.forEach(peca => {
      if(peca) haPecas = true;
    })
    return haPecas;
  }

  configurarTabela() {
    var tabelaForm = this.cadTabForm.getRawValue();
    var nomeTabela = tabelaForm.nomeTabela;
    var novaTabela: TabelaDePreco = {
      nomeTabela,
      pecas: this.configurarPecas(tabelaForm.pecas),
      tabelaAtiva: true,
      ultimaModificacao: new Date(),
      tabelaPadrao: false
    }
    return novaTabela;
  }

  configurarPecas(precos: string[]) {
    let pecasDaTabela = []
    precos.forEach((precoPeca, i) => {
      if (precoPeca) {
        var preco = precoPeca.replace('R$', '').replace('.','').replace(',','.');
        pecasDaTabela.push({
          id: this.pecas[i].id,
          nomePeca: this.pecas[i].nome,
          precoPeca: parseFloat(preco)
        } as PecaDaTabelaDePrecos)
      };
    })
    return pecasDaTabela;
  }
}