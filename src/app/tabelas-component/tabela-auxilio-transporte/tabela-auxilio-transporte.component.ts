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

  displayedColumns: string[] = [ 'graduacaoNome', 'militarPrecCP', 'valorTotal', 'valorDiario', 'atualizacao', 'editar'];

  dataSource;

  constructor(private auxilioTransporteService: AuxiliosTransporteService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private conducoesService: ConducoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.loadAuxiliosTransporte();
    this.loadConducoes();
  //  this.auxilioTransportes = this.servico.getAT();
  //  this.auxiliosTransporteSemPublicacao = this.servico.getATSemPublicacao();
  //  this.conducoesSemPublicacao = this.servico.getConducoesSemPublicacao();
   // this.conducoes = this.servico.getConducoes();
  }

  loadAuxiliosTransporte() {
    this.auxilioTransporteService.findAll().subscribe(response => {this.dataSource = response;
      console.log(this.auxiliosTransporte); this.atribuiMilitares(this.dataSource); } ,
        error => {console.log(error); } );
  }

  atribuiMilitares(auxiliosTransporte: AuxilioTransporteDTO[]) {
    for (let i = 0; i < auxiliosTransporte.length; i++) {
        this.militaresService.findMilitarByPrecCP(auxiliosTransporte[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; auxiliosTransporte[i].nome = this.militares[i].nome;
                      this.atribuiGraduacoes(auxiliosTransporte[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  atribuiGraduacoes(auxilioTransporte: AuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; auxilioTransporte.graduacao = this.postoGraduacao.nome;
                   this.atribuiTextoAtualizacao(auxilioTransporte); }, error => {console.log(error); } );
  }

  atribuiTextoAtualizacao(auxilioTransporte: AuxilioTransporteDTO) {
      if (auxilioTransporte.atualizacao === true) {
        auxilioTransporte.atualizacaoTexto = 'Atualizado';
        console.log(auxilioTransporte.atualizacaoTexto);
      } else {
        auxilioTransporte.atualizacaoTexto = 'DESATUALIZADO!';
      }
  }

  loadConducoes() {
    this.conducoesService.findAll().subscribe(response => {this.conducoes = response;
      console.log(this.conducoes); }, error => {console.log(error); } );
  }

  updateAuxilioTransporte() {
    this.auxilioTransporteService.updateAuxilioTransporte().subscribe(response => { console.log(response);
      this.ngOnInit(); }, error => {console.log(error); } );

  }

  moveToFormAuxilioTransporte() {
    this.router.navigate(['/cadastroDeAT']);

  }

  cancel() {
    this.router.navigate(['/index']);

  }
}
