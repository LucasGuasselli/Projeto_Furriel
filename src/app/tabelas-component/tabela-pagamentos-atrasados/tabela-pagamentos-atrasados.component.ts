import { Component, OnInit } from '@angular/core';
import { SaqueAtrasadoDTO } from '../../models/saqueAtrasado.dto';
import { SaquesAtrasadosService } from '../../services/saquesAtrasados.service';
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

  saquesAtrasados: SaqueAtrasadoDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;
  dataSource;
  displayedColumns: string[] = ['graduacaoNome', 'militarPrecCP', 'mesReferencia', 'quantidadeDias', 'valor'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private saquesAtrasadosService: SaquesAtrasadosService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router) { }

  ngOnInit() {
    this.loadPagamentosAtrasados();
  }

  loadPagamentosAtrasados() {
    this.saquesAtrasadosService.findAll().subscribe(
      response => {
        this.saquesAtrasados = response;
        this.assignMilitares(this.saquesAtrasados); 
      },
      error => { console.log(error); }
    );
  }

  assignMilitares(pagamentosAtrasados: SaqueAtrasadoDTO[]) {
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

  assignGraduacoes(pagamentosAtrasados: SaqueAtrasadoDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => { this.postoGraduacao = response; pagamentosAtrasados.graduacao = this.postoGraduacao.nome; },
           error => { console.log(error); } );
  }

  removePagamentoAtrasado(pagamentoAtrasado: SaqueAtrasadoDTO) {
   // this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
  }

  moveToFormPagamentoAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
