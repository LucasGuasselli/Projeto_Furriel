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
  selector: 'app-tabela-despesas-a-anular',
  templateUrl: './tabela-despesas-a-anular.component.html',
  styleUrls: ['./tabela-despesas-a-anular.component.css']
})
export class TabelaDespesasAAnularComponent implements OnInit {

  despesas: DespesaDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;
  militarPrecCP: number;
  dataSource;

  displayedColumns: string[] = ['id', 'graduacao', 'nome', 'militarPrecCP', 'dataInicio', 'dataFim',
                                'quantidadeDias', 'valor', 'motivo', 'remover'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private despesasAAnularService: DespesasService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.carregarDespesas();
  }

  carregarDespesas() {
    this.despesasAAnularService.retornarTodos().subscribe(
      response => {
        this.dataSource = response;
        this.atribuirMilitares(this.dataSource); 
      },
      error => {console.log(error); } 
    );
  }

  atribuirMilitares(despesas: DespesaDTO[]) {
    for (let i = 0; i < despesas.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(despesas[i].militarPrecCP).subscribe(
          response => { 
            this.militares[i] = response; despesas[i].nome = this.militares[i].nome;
            this.atribuirGraduacoes(despesas[i], this.militares[i]); 
          },
          error => { console.log(error); }
        );
    }
    this.dataSource = new MatTableDataSource(despesas);
  }

  atribuirGraduacoes(despesa: DespesaDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
        response => { this.postoGraduacao = response; despesa.graduacao = this.postoGraduacao.nome; },
        error => {console.log(error); } 
      );
  }

  removerDespesaAAnular(despesaAAnular: DespesaDTO) {
    this.despesasAAnularService.deletar(despesaAAnular).subscribe(
      response => { 
        if (response.status === 204) {
          console.log(response);
          this.ngOnInit();
      } 
    },
      error => { console.log(error); }
    );
  }

  moverParaFormDespesa() {
    this.router.navigate(['/cadastroDesconto']);
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}
