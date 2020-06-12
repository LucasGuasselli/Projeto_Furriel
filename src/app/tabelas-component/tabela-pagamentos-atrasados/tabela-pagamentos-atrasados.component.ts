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
  displayedColumns: string[] = ['graduacaoNome', 'militarPrecCP', 'mesReferencia', 'quantidadeDias', 'valor', 'remover'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private saquesAtrasadosService: SaquesAtrasadosService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router) { }

  ngOnInit() {
    this.carregarPagamentosAtrasados();
  }

  carregarPagamentosAtrasados() {
    this.saquesAtrasadosService.retornarTodos().subscribe(
      response => {
        this.saquesAtrasados = response;
        this.atribuirMilitares(this.saquesAtrasados); 
      },
      error => { console.log(error); }
    );
  }

  atribuirMilitares(pagamentosAtrasados: SaqueAtrasadoDTO[]) {
    for (let i = 0; i < pagamentosAtrasados.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(pagamentosAtrasados[i].militarPrecCP).subscribe(
          response => { 
            this.militares[i] = response; pagamentosAtrasados[i].nome = this.militares[i].nome;
            this.atribuirGraduacoes(pagamentosAtrasados[i], this.militares[i]); },
          error => { console.log(error); }
        );
    }
    this.dataSource = new MatTableDataSource(pagamentosAtrasados);
  }

  atribuirGraduacoes(pagamentosAtrasados: SaqueAtrasadoDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
        response => { this.postoGraduacao = response; pagamentosAtrasados.graduacao = this.postoGraduacao.nome; },
           error => { console.log(error); } );
  }

  removerSaqueAtrasado(saqueAtrasado: SaqueAtrasadoDTO) {
    this.saquesAtrasadosService.deletar(saqueAtrasado).subscribe(response => { 
      if (response.status === 204) {
        this.ngOnInit();
      } 
    },
    error => { console.log(error); }
    );
  }

  moverParaFormPagamentoAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
