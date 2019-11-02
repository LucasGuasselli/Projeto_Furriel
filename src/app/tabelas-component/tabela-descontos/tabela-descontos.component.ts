import { Component, OnInit } from '@angular/core';
import { DespesaDTO } from '../../models/despesa.dto';
import { DespesasService } from '../../services/despesas.service';
import { MilitarDTO } from '../../models/militar.dto';
import { MilitaresService } from '../../services/militares.service';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tabela-descontos',
  templateUrl: './tabela-descontos.component.html',
  styleUrls: ['./tabela-descontos.component.css']
})
export class TabelaDescontosComponent implements OnInit {

  despesas: DespesaDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;
  militarPrecCP: number;
  dataSource;

  displayedColumns: string[] = ['id', 'graduacao', 'nome', 'militarPrecCP', 'dataInicio', 'dataFim',
                                'quantidadeDias', 'valor', 'motivo'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private despesasService: DespesasService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.loadDespesas();
  }

  loadDespesas() {
    this.despesasService.findAll().subscribe(response => {this.dataSource = response;
    console.log(this.dataSource); this.atribuiMilitares(this.dataSource); } ,
      error => {console.log(error); } );
  }

  atribuiMilitares(despesas: DespesaDTO[]) {
    for (let i = 0; i < despesas.length; i++) {
        this.militaresService.findMilitarByPrecCP(despesas[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; despesas[i].nome = this.militares[i].nome;
                      this.atribuiGraduacoes(despesas[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
    this.dataSource = new MatTableDataSource(despesas);
  }

  atribuiGraduacoes(despesa: DespesaDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; despesa.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  moveToFormDesconto() {
    this.router.navigate(['/cadastroDesconto']);
  }

  cancel() {
    this.router.navigate(['/index']);
  }

}
