import { Component, OnInit } from '@angular/core';
import { PagamentoAtrasadoDTO } from '../../models/pagamentoAtrasado.dto';
import { PagamentosAtrasadosService } from '../../services/pagamentosAtrasados.service';
import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-pagamentos-atrasados',
  templateUrl: './tabela-pagamentos-atrasados.component.html',
  styleUrls: ['./tabela-pagamentos-atrasados.component.css']
})
export class TabelaPagamentosAtrasadosComponent implements OnInit {

  pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  displayedColumns: string[] = ['graduacaoNome', 'militarPrecCP', 'mesReferencia', 'quantidadeDias', 'valor'];
  constructor(private pagamentosAtrasadosService: PagamentosAtrasadosService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router) { }

  ngOnInit() {
    this.loadDespesas();
  }

  loadDespesas() {
    this.pagamentosAtrasadosService.findAll().subscribe(response => {this.pagamentosAtrasados = response;
    console.log(this.pagamentosAtrasados); this.atribuiMilitares(this.pagamentosAtrasados); } ,
      error => {console.log(error); } );
  }

  atribuiMilitares(pagamentosAtrasados: PagamentoAtrasadoDTO[]) {
    for (let i = 0; i < pagamentosAtrasados.length; i++) {
        this.militaresService.findMilitarByPrecCP(pagamentosAtrasados[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; pagamentosAtrasados[i].nome = this.militares[i].nome;
                      this.atribuiGraduacoes(pagamentosAtrasados[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  atribuiGraduacoes(pagamentosAtrasados: PagamentoAtrasadoDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; pagamentosAtrasados.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  removerPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasadoDTO) {
   // this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
  }

  moveToFormPagamentoAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
