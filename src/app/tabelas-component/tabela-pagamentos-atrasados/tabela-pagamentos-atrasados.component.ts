import { Component, OnInit } from '@angular/core';
import { PagamentoAtrasadoDTO } from '../../models/pagamentoAtrasado.dto';
import { PagamentosAtrasadosService } from '../../services/pagamentosAtrasados.service';
import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tabela-pagamentos-atrasados',
  templateUrl: './tabela-pagamentos-atrasados.component.html',
  styleUrls: ['./tabela-pagamentos-atrasados.component.css']
})
export class TabelaPagamentosAtrasadosComponent implements OnInit {

  pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;
  dataSource;
  displayedColumns: string[] = ['graduacaoNome', 'militarPrecCP', 'mesReferencia', 'quantidadeDias', 'valor'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private pagamentosAtrasadosService: PagamentosAtrasadosService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router) { }

  ngOnInit() {
    this.loadPagamentosAtrasados();
  }

  loadPagamentosAtrasados() {
    this.pagamentosAtrasadosService.findAll().subscribe(
      response => {
        this.pagamentosAtrasados = response;
        this.assignMilitares(this.pagamentosAtrasados); 
      },
      error => { console.log(error); }
    );
  }

  assignMilitares(pagamentosAtrasados: PagamentoAtrasadoDTO[]) {
    for (let i = 0; i < pagamentosAtrasados.length; i++) {
        this.militaresService.findMilitarByPrecCP(pagamentosAtrasados[i].militarPrecCP).subscribe(
          response => { 
            this.militares[i] = response; pagamentosAtrasados[i].nome = this.militares[i].nome;
            this.assignGraduacoes(pagamentosAtrasados[i], this.militares[i]); },
          error => { console.log(error); }
        );
    }
    this.dataSource = new MatTableDataSource(pagamentosAtrasados);
  }

  assignGraduacoes(pagamentosAtrasados: PagamentoAtrasadoDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => { this.postoGraduacao = response; pagamentosAtrasados.graduacao = this.postoGraduacao.nome; },
           error => { console.log(error); } );
  }

  removePagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasadoDTO) {
   // this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
  }

  moveToFormPagamentoAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
