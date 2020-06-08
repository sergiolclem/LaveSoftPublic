import { Component, OnInit } from '@angular/core';

import { CadastroDeClienteFormService } from 'src/app/services/forms/cadastro-de-cliente-form.service';
import { TabelasDePrecoService } from 'src/app/services/conexao-firestore/tabelas-de-preco.service';
import { TabelaDePreco } from 'src/app/interfaces/tabela-de-preco';

@Component({
  selector: 'app-info-faturamento',
  templateUrl: './info-faturamento.component.html',
  styleUrls: ['./info-faturamento.component.css']
})
export class InfoFaturamentoComponent implements OnInit {

  public tabelas: TabelaDePreco[];
  public tabsCarregadas: boolean = false;

  constructor(
    public cadClienteForm: CadastroDeClienteFormService,
    private tabPrecoService: TabelasDePrecoService
  ) { }

  ngOnInit(): void {
    this.tabPrecoService.tabelas.subscribe(tabs => {
      this.tabelas = tabs;
      this.tabsCarregadas = true;
    })
  }

}
