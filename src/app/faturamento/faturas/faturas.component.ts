import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { TabelaFaturasService, DadoTabelaFaturas } from 'src/app/services/faturas/tabela-faturas.service';
import { FaturaService } from 'src/app/services/conexao-firestore/fatura.service';
import { DetalhesFaturaComponent } from './detalhes-fatura/detalhes-fatura.component';
import { Fatura } from 'src/app/interfaces/fatura';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.css']
})
export class FaturasComponent implements OnInit {

  public dadosTabFatura: MatTableDataSource<DadoTabelaFaturas>;
  public spinner: boolean;
  public toggleAtivo: boolean = true;
  public totalOrdens: number = 0;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private tabFatsService: TabelaFaturasService,
    private fatService: FaturaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarFaturas();
  }

  async carregarFaturas() {
    this.spinner = true;
    this.dadosTabFatura = await this.configurarDados();
    this.totalOrdens = this.getTotal();
    this.spinner = false;
  }

  async configurarDados() {
    let faturas = await this.fatService.faturas.toPromise();
    let dados = this.tabFatsService.gerarFonteDados(faturas);
    let matDados = new MatTableDataSource(dados);
    matDados.sort = this.sort;
    return matDados;
  }

  get cabecalho() {
    return this.tabFatsService.cabecalho;
  }

  abrirDetalhes(fatura: Fatura) {
    let dialog = this.dialog.open(DetalhesFaturaComponent, {
      data: fatura,
      minWidth: '60%'
    })

    dialog.afterClosed().subscribe(res => {
      this.carregarFaturas();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dadosTabFatura.filter = filterValue.trim().toLowerCase();
    this.totalOrdens = this.getTotal();
  }

  getTotal() {
    return this.dadosTabFatura ? this.calcularTotal() : 0;
  }

  calcularTotal() {
    return this.dadosTabFatura.filteredData
      .map(det => det.valorTotal)
      .reduce((acc, value) => acc + value, 0);
  }

  mudarStatusPara(estado: boolean, fatura: Fatura) {
    this.toggleAtivo = false;
    this.fatService.alterarStatusFatura(fatura.id, estado).subscribe(() => {
      this.carregarFaturas();
      this.toggleAtivo = true;
    })
  }
}
