import { Component, OnInit } from '@angular/core';

import { CadastroDeClienteFormService } from 'src/app/services/forms/cadastro-de-cliente-form.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { UsuarioService } from 'src/app/core/usuario/usuario.service';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  private usuario: string;

  constructor(
    public cadClienteForm: CadastroDeClienteFormService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.cadClienteForm.criarForm();
    this.usuarioService.usuario$.subscribe(user => {
      this.usuario = user.displayName
    })
  }

  cadastrarCliente() {
    var mensagem = 'cadastrando cliente ...'
    var novoCliente = this.getCliente();
    var cadastrando = this.snackBar.open(mensagem)

    this.clienteService.addCliente(novoCliente).subscribe(res => {
      cadastrando.dismiss();
      this.router.navigate(['consultas', 'consulta-cliente'])
      this.snackBar.open('Cliente cadastrado', '', { duration: 2500 })
    })
  }

  getCliente() {
    var form = this.cadClienteForm.cadastroDeClienteForm;
    
    return {
      infoPrincipais: {
        nome: form.get('nome').value,
        categoria: form.get('categoria').value,
        cidade: form.get('cidade').value,
        endereco: form.get('endereco').value,
        cpfOuCnpj: form.get('cpfOuCnpj').value,
        observacoes: form.get('observacoes').value,
      },
      contatos: form.get('contatos').value,
      infoFaturamento: {
        tabelaPreco: {
          nome: form.get('tabelaDePreco').value.nomeTabela,
          dataAlteracao: new Date(),
          id: form.get('tabelaDePreco').value.id
        },
        condicaoFaturamento: form.get('condicaoFaturamento').value,
        condicaoPagamento: {
          formaPagamento: form.get('formaPagamento').value,
          prazo: form.get('prazo').value
        }
      },
      infoProcesso: {
        saldo: []
      },
      metaDados: {
        clienteAtivo: true,
        dataCadastro: new Date(),
        usuario: this.usuario
      }
    } as Cliente;
  }

  limparForm() {
    this.cadClienteForm.cadastroDeClienteForm.reset();
  }
}
