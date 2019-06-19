import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MilitaresService } from '../services/militares.service';
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
import { AtualizacaoAuxilioTransporteDTO } from '../models/atualizacaoAuxilioTransporte.dto';
import { AtualizacoesAuxilioTransporteService } from '../services/atualizacoesAuxilioTransporte.service';
import { AditamentoDTO } from '../models/aditamento.dto';
import { AditamentosService } from '../services/aditamentos.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  despesas: DespesaDTO[] = [];
  inclusoesAuxilioTransporte: InclusaoAuxilioTransporteDTO[] = [];
  atualizacoesAuxiliosTransporte: AtualizacaoAuxilioTransporteDTO[] = [];
  exclusoesAuxilioTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];

  aditamentos: AditamentoDTO[] = [];
  aditamento: AditamentoDTO = new AditamentoDTO;
  constructor(private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private despesasService: DespesasService,
              private exclusoesAuxilioTransporteService: ExclusoesAuxilioTransporteService,
              private inclusoesAuxilioTransporteService: InclusoesAuxilioTransporteService,
              private pagamentosAtrasadosService: PagamentosAtrasadosService,
              private atualizacoesAuxilioTransporteService: AtualizacoesAuxilioTransporteService,
              private aditamentosService: AditamentosService) { }

  ngOnInit() {
    this.loadTexto();
    this.loadAditamentos();
  }

  downloadPDF() {
    return xepOnline.Formatter.Format('content', {render: 'download'});
  }

  loadAditamentos() {
    this.aditamentosService.findAll().subscribe( response => { this.aditamentos = response; },
       error => {console.log(error); });
  }

  loadInfomationAditamento(id: number) {
    this.loadDespesas(id);
    this.loadInclusoesAuxilioTransporte(id);
    this.loadAtualizacoesAuxilioTransporte(id);
    this.loadExclusoesAuxilioTransporte(id);
    this.loadPagamentosAtrasados(id);
  }

// DESPESA A ANULAR
  loadDespesas(id: number) {
    this.despesasService.findDespesasByAditamentoId(id).subscribe(response => {this.despesas = response;
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

  // INCLUSOES AUXILIO TRANSPORTE
  loadInclusoesAuxilioTransporte(id: number) {
    this.inclusoesAuxilioTransporteService.findInclusoesByAditamentoId(id).subscribe(
      response => {this.inclusoesAuxilioTransporte = response;
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

  // AUMENTO DE PASSAGEM
  loadAtualizacoesAuxilioTransporte(id: number) {
    this.atualizacoesAuxilioTransporteService.findAtualizacoesByAditamentoId(id).subscribe(response => {
      this.atualizacoesAuxiliosTransporte = response; console.log(this.atualizacoesAuxiliosTransporte);
      this.loadMilitaresOnAtualizacoes(this.atualizacoesAuxiliosTransporte); } , error => {console.log(error); } );
  }

  loadMilitaresOnAtualizacoes(atualizacoes: AtualizacaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < atualizacoes.length; i++) {
      this.militaresService.findMilitarByPrecCP(atualizacoes[i].militarPrecCP).subscribe(
        response => {this.militares[i] = response; atualizacoes[i].nome = this.militares[i].nome;
                    this.loadGraduacoesOnAtualizacao(atualizacoes[i], this.militares[i]); },
        error => {console.log(error); }
      );
    }
  }

  loadGraduacoesOnAtualizacao(atualizacao: AtualizacaoAuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; atualizacao.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

  // EXCLUSOES AUXILIO TRANSPORTE
  loadExclusoesAuxilioTransporte(id: number) {
    this.exclusoesAuxilioTransporteService.findExclusoesByAditamentoId(id).subscribe(
      response => {this.exclusoesAuxilioTransporte = response;
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

// SAQUES ATRASADOS
  loadPagamentosAtrasados(id: number) {
      this.pagamentosAtrasadosService.findPagamentosAtrasadosByAditamentoId(id).subscribe(response => {this.pagamentosAtrasados = response;
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

  loadTexto() {
    this.aditamento.despesaTexto = 'Seja realizada a Despesa a Anular (DA) do benefício ' +
                                   'de Auxílio Transporte (AT), de acordo com o Decreto nº 2.963, de 24 fev 1999,' +
                                   ' as IG 70-04 (Port. nº 334, de 25 jun 1999), as IR 70-21 (Port. nº 114, de 30 jun 1999), ' +
                                   'a Port. nº 98 – DGP, de 31 out 01, a Prt. nº 269 – DGP, de 11 dez 07 e a Port. nº 849 – Cmt ' +
                                   'Ex, de 14 jul 16 (EB 10-IG-02.018).';

    this.aditamento.inclusaoTexto = 'Seja realizada a Inclusão do benefício de Auxílio Transporte (AT), ' +
                                    'de acordo com o Decreto nº 2.963, de 24 fev 1999, as IG 70-04 (Port. nº 334, ' +
                                    ' de 25 jun 1999), as IR 70-21 (Port. nº 114, de 30 jun 1999), a Port. nº 98 – DGP, ' +
                                    'de 31 out 01, a Prt. nº 269 – DGP, de 11 dez 07 e a Port. nº 849 – Cmt Ex, de 14 jul 16 ' +
                                    '(EB 10-IG-02.018). ';

    this.aditamento.atualizacaoTexto =  'Seja atualizado o valor do benefício do Auxílio-Transporte (AT) referente ' +
                                        'ao deslocamento de 22 (vinte e dois) dias, de acordo com o Decreto nº 2.963, ' +
                                        'de 24 fev 1999, as IG 70-04 (Port. nº 334, de 25 jun 1999), as IR 70-21 (Port. nº 14, ' +
                                        'de 30 jun 1999), a Port. nº 98 - DGP, de 31 out 01, a Port. nº 269 - DGP, de 11 dez 07 ' +
                                        'e a Port. nº 849 - Cmt Ex, de 14 jul 16 (EB 10-IG-02.018).' ;

    this.aditamento.exclusaoTexto = 'Seja atualizado o valor do benefício do Auxílio-Transporte (AT) referente ' +
                                    'ao deslocamento de 22 (vinte e dois) dias, de acordo com o Decreto nº 2.963, ' +
                                    'de 24 fev 1999, as IG 70-04 (Port. nº 334, de 25 jun 1999), as IR 70-21 (Port. nº 14, ' +
                                    'de 30 jun 1999), a Port. nº 98 - DGP, de 31 out 01, a Port. nº 269 - DGP, de 11 dez 07 ' +
                                    'e a Port. nº 849 - Cmt Ex, de 14 jul 16 (EB 10-IG-02.018).' ;

    this.aditamento.pagamentoAtrasadoTexto =  'Seja realizado o saque atrasado do benefício de Auxlio-Transporte (AT), ' +
                                              'de acordo com o Decreto nº 2.963, de 24 fev 1999, as IG 70-04 (Port. nº 334, ' +
                                              'de 25 jun 1999), as IR 70-21 (Port. nº 14, de 30 jun 1999), a Port. nº 98 - DGP, ' +
                                              'de 31 out 01, a Port. nº 269 - DGP, de 11 dez 07 e a Port. nº 849 - Cmt Ex, de 14 ' +
                                              'jul 16 (EB 10-IG-02.018).';
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
