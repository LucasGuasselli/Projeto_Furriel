import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MilitaresService } from '../services/militares.service';
import { AtualizacaoAuxilioTransporte } from '../atualizacao-auxilio-transporte';
import { DespesaDTO } from '../models/despesa.dto';
import { MilitarDTO } from '../models/militar.dto';
import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';
import { PostosGraduacoesService } from '../services/postosGraduacoes.service';
import { DespesasService } from '../services/despesas.service';
import { ExclusoesAuxilioTransporteService } from '../services/exclusaoAuxilioTransporte.service';
import { ExclusaoAuxilioTransporteDTO } from '../models/exclusaoAuxilioTransporte.dto';
import { PagamentoAtrasadoDTO } from '../models/pagamentoAtrasado.dto';
import { InclusaoAuxilioTransporteDTO } from '../models/inclusaoAuxilioTransporte.dto';
import { InclusoesAuxilioTransporteService } from '../services/inclusoesAuxilioTransporte.service';
import { PagamentosAtrasadosService } from '../services/pagamentosAtrasados.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: MilitarDTO[] = [];
  despesas: DespesaDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  inclusoesAuxilioTransporte: InclusaoAuxilioTransporteDTO[] = [];
  atualizacaoAuxiliosTransporte: AtualizacaoAuxilioTransporte[] = [];
  exclusoesAuxilioTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];

  constructor(private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private despesasService: DespesasService,
              private exclusoesAuxilioTransporteService: ExclusoesAuxilioTransporteService,
              private inclusoesAuxilioTransporteService: InclusoesAuxilioTransporteService,
              private pagamentosAtrasadosService: PagamentosAtrasadosService) { }

  ngOnInit() {

    this.loadDespesas();
    this.loadExclusoesAuxilioTransporte();
    this.loadInclusoesAuxilioTransporte();
    this.loadPagamentosAtrasados();
      // this.atualizacaoAuxiliosTransporte = this.servicoCrudAT.getAtualizacaoAuxiliosTransporte();
      //  this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
  }

  downloadPDF() {
    return xepOnline.Formatter.Format('content', {render: 'download'});
  }

// DESPESA A ANULAR
  loadDespesas() {
    this.despesasService.findAll().subscribe(response => {this.despesas = response;
    console.log(this.despesas); this.loadMilitaresOnDespesas(this.despesas); } ,
      error => {console.log(error); } );
  }

  loadMilitaresOnDespesas(despesas: DespesaDTO[]) {
    for (let i = 0; i < despesas.length; i++) {
        this.militaresService.findMilitarByPrecCP(despesas[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; despesas[i].nome = this.militares[i].nome;
                      this.loadGraduacoesOnDespesa(this.despesas[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  loadGraduacoesOnDespesa(despesa: DespesaDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; despesa.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  // EXCLUSOES AUXILIO TRANSPORTE
  loadExclusoesAuxilioTransporte() {
    this.exclusoesAuxilioTransporteService.findAll().subscribe(response => {this.exclusoesAuxilioTransporte = response;
      console.log(this.exclusoesAuxilioTransporte); this.loadMilitaresOnExclusao(this.exclusoesAuxilioTransporte); } ,
        error => {console.log(error); } );
  }

  loadMilitaresOnExclusao(exclusoes: ExclusaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < exclusoes.length; i++) {
        this.militaresService.findMilitarByPrecCP(exclusoes[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; exclusoes[i].nome = this.militares[i].nome;
                      this.loadGraduacoesOnExclusao(exclusoes[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  loadGraduacoesOnExclusao(exclusao: ExclusaoAuxilioTransporteDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; exclusao.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  // INCLUSOES AUXILIO TRANSPORTE
  loadInclusoesAuxilioTransporte() {
    this.inclusoesAuxilioTransporteService.findAll().subscribe(response => {this.inclusoesAuxilioTransporte = response;
      console.log(this.inclusoesAuxilioTransporte); this.loadMilitaresOnInclusao(this.inclusoesAuxilioTransporte); } ,
        error => {console.log(error); } );
  }

  loadMilitaresOnInclusao(inclusoes: InclusaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < inclusoes.length; i++) {
      this.militaresService.findMilitarByPrecCP(inclusoes[i].militarPrecCP).subscribe(
        response => {this.militares[i] = response; inclusoes[i].nome = this.militares[i].nome;
                    this.loadGraduacoesOnInclusao(inclusoes[i], this.militares[i]); },
        error => {console.log(error); }
      );
    }
  }

  loadGraduacoesOnInclusao(inclusao: InclusaoAuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; inclusao.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

// SAQUES ATRASADOS
  loadPagamentosAtrasados() {
      this.pagamentosAtrasadosService.findAll().subscribe(response => {this.pagamentosAtrasados = response;
      console.log(this.pagamentosAtrasados); this.loadMilitaresOnPagamentoAtrasado(this.pagamentosAtrasados); } ,
        error => {console.log(error); } );
  }

  loadMilitaresOnPagamentoAtrasado(pagamentos: PagamentoAtrasadoDTO[]) {
      for (let i = 0; i < pagamentos.length; i++) {
        this.militaresService.findMilitarByPrecCP(pagamentos[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; pagamentos[i].nome = this.militares[i].nome;
                      this.loadGraduacoesOnPagamentoAtrasado(pagamentos[i], this.militares[i]); },
          error => {console.log(error); }
        );
      }
  }

  loadGraduacoesOnPagamentoAtrasado(pagamento: PagamentoAtrasadoDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; pagamento.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

  /*
  // tslint:disable-next-line:member-ordering
  @ViewChild('content') content: ElementRef;

  public downloadPDF() {
      // tslint:disable-next-line:prefer-const
      let doc = new jsPDF();

      // tslint:disable-next-line:prefer-const
      let specialElementHandlers = {
          '#editor': function(element, renderer) {
              return true;
          }
      };
      // tslint:disable-next-line:prefer-const
      let content = this.content.nativeElement;
      // doc.text(this.despesas[0].graduacao, 10, 10);

      doc.fromHTML(content.innerHTML, 30, 30, {
          'width': 100 ,
          'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');
  }
*/
}
