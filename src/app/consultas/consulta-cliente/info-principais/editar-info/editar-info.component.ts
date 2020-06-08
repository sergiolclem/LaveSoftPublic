import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Cliente, InfoPrincipais } from 'src/app/interfaces/cliente';
import { ConsultaClienteService } from '../../consulta-cliente.service';
import { ClienteService } from 'src/app/services/conexao-firestore/cliente.service';
import { InfoPrincipaisFormService } from './info-principais-form.service';

@Component({
  selector: 'app-editar-info',
  templateUrl: './editar-info.component.html',
  styleUrls: ['./editar-info.component.css']
})
export class EditarInfoComponent implements OnInit {

  public cliente: Cliente;
  
  constructor(
    private consClienteService: ConsultaClienteService,
    private clienteService: ClienteService,
    public infoForm: InfoPrincipaisFormService
  ) { }

  ngOnInit(): void {
    this.consClienteService.cliente$.subscribe(cli => {
      this.cliente = cli;
      if(cli) this.infoForm.iniciarForm(cli.infoPrincipais)
    })
  }

  atualizarCliente(cliente: Cliente) {
    var clienteAtualizado = _.cloneDeep(cliente);
    clienteAtualizado.infoPrincipais = this.definirInfoPrincipais()

    this.clienteService.atualizarCliente(clienteAtualizado).subscribe(res => {
      console.log(res)
    })
  }

  definirInfoPrincipais() {
    var infoPrincipais: InfoPrincipais = {
      nome: this.infoForm.nome,
      categoria: this.infoForm.categoria
    }

    if(this.infoForm.cidade) infoPrincipais.cidade = this.infoForm.cidade;
    
    if(this.infoForm.endereco) infoPrincipais.endereco = this.infoForm.endereco;
    
    if(this.infoForm.cpfOuCnpj) infoPrincipais.cpfOuCnpj = this.infoForm.cpfOuCnpj;
    
    if(this.infoForm.observacoes) infoPrincipais.observacoes = this.infoForm.observacoes;

    return infoPrincipais;
  }

}
