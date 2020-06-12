import { Component, OnInit } from '@angular/core';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { MilitaresService } from '../../services/militares.service';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ConducaoDTO } from '../../models/conducao.dto';
import { MilitarDTO } from '../../models/militar.dto';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { ConducoesService } from '../../services/conducoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tabela-auxilio-transporte',
  templateUrl: './tabela-auxilio-transporte.component.html',
  styleUrls: ['./tabela-auxilio-transporte.component.css']
})
export class TabelaAuxilioTransporteComponent implements OnInit {

  auxiliosTransporte: AuxilioTransporteDTO[] = [];
  conducoes: ConducaoDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;
  // auxiliosToUpdateEntregaSPPId: number [] = [];
  auxiliosToUpdateEntregaSPP: AuxilioTransporteDTO[] = [];

  displayedColumns: string[] = [ 'graduacaoNome', 'militarPrecCP', 'valorTotal', 'valorDiario', 'atualizacao',
                                 'updateEntrega', 'editar'];

  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private auxilioTransporteService: AuxiliosTransporteService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private conducoesService: ConducoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.carregarAuxiliosTransporte();
  //  this.loadConducoes();
  //  this.auxilioTransportes = this.servico.getAT();
  //  this.auxiliosTransporteSemPublicacao = this.servico.getATSemPublicacao();
  //  this.conducoesSemPublicacao = this.servico.getConducoesSemPublicacao();
   // this.conducoes = this.servico.getConducoes();
  }

  carregarAuxiliosTransporte() {
    this.auxilioTransporteService.retornarTodos().subscribe(
      response => { 
        this.dataSource = response;
        this.atribuirMilitares(this.dataSource); 
      },
        error => {console.log(error); } 
      );
  }

  atribuirMilitares(auxiliosTransporte: AuxilioTransporteDTO[]) {
    for (let i = 0; i < auxiliosTransporte.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(auxiliosTransporte[i].militarPrecCP).subscribe(
          response => { 
              this.militares[i] = response;
              auxiliosTransporte[i].nome = this.militares[i].nome;
              this.atribuirGraduacoes(auxiliosTransporte[i], this.militares[i]); 
          },
          error => { console.log(error); }
        );
    }
    // instanciando a tabela com os dados
    this.dataSource = new MatTableDataSource(auxiliosTransporte);
  }

  atribuirGraduacoes(auxilioTransporte: AuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
      response => { 
        this.postoGraduacao = response; 
        auxilioTransporte.graduacao = this.postoGraduacao.nome;
        this.atribuirTextoAtualizacao(auxilioTransporte);
        this.atribuirTextoEntrega(auxilioTransporte); 
      },
        error => {console.log(error); } 
    );
  }

  atribuirTextoAtualizacao(auxilioTransporte: AuxilioTransporteDTO) {
      if (auxilioTransporte.atualizacao === true) {
        auxilioTransporte.atualizacaoTexto = 'Atualizado';
      } else {
        auxilioTransporte.atualizacaoTexto = 'DESATUALIZADO!';
      }
  }

  atribuirTextoEntrega(auxilioTransporte: AuxilioTransporteDTO) {
    if (auxilioTransporte.entregaSPP === true) {
      auxilioTransporte.entregaTexto = 'Entregue';
    } else {
      auxilioTransporte.entregaTexto = 'NÃO CONSTA NO SPP!';
    }
  }

  carregarConducoes() {
    this.conducoesService.retornarTodos().subscribe(response => { this.conducoes = response; }, 
      error => {console.log(error); } 
    );
  }

  atualizarAuxilioTransporte() {
    this.auxilioTransporteService.atualizarAuxilioTransporte().subscribe(response => { console.log(response);
      this.ngOnInit(); }, error => {console.log(error); } );

  }

  // altera a variavel booleana entregaSPP do auxilioTransporte conforme selecoes dos checkBox
  atualizarEntregaSPP(auxilioTransporte: AuxilioTransporteDTO) {
      if (auxilioTransporte.entregaSPP === true) {
          auxilioTransporte.entregaSPP = false;
            this.auxilioTransporteService.editar(auxilioTransporte, auxilioTransporte.id).subscribe(
              response => { 
                if (response.status === 204) { console.log('Auxílio editado false com sucesso!' + auxilioTransporte.entregaSPP); }
              },
              error => { console.log(error); }
            );
      } else {
          auxilioTransporte.entregaSPP = true;
            this.auxilioTransporteService.editar(auxilioTransporte, auxilioTransporte.id).subscribe(
              response => { 
                if (response.status === 204) { console.log('Auxílio editado true com sucesso!' + auxilioTransporte.entregaSPP); }
          }, 
            error => {console.log(error); }
          );
      }
  }

  moverParaFormAuxilioTransporte() {
    this.router.navigate(['/cadastroAT']);
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
