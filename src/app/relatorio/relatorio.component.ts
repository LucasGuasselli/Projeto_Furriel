import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MilitaresService } from '../services/militares.service';
import { PagamentoAtrasado } from '../pagamento-atrasado';
import { AtualizacaoAuxilioTransporte } from '../atualizacao-auxilio-transporte';
import { DespesaDTO } from '../models/despesa.dto';
import { MilitarDTO } from '../models/militar.dto';
import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';
import { PostosGraduacoesService } from '../services/postosGraduacoes.service';
import { DespesasService } from '../services/despesas.service';
import { ExclusoesAuxiliosTransporteService } from '../services/exclusaoAuxilioTransporte.service';
import { ExclusaoAuxilioTransporteDTO } from '../models/exclusaoAuxilioTransporteDTO';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: MilitarDTO[] = [];
  despesas: DespesaDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  // inclusaoAuxiliosTransporte: InclusaoAuxilioTransporte[] = [];
  atualizacaoAuxiliosTransporte: AtualizacaoAuxilioTransporte[] = [];
  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  pagamentosAtrasados: PagamentoAtrasado[] = [];

  texto: String = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  constructor(private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private despesasService: DespesasService,
              private exclusoesAuxiliosTransporteService: ExclusoesAuxiliosTransporteService) { }

  ngOnInit() {

    this.loadDespesas();
    this.loadExclusoesAuxiliosTransporte();

      // this.militares = this.militaresService.getMilitares();
      // this.enderecos = this.militaresService.getEnderecos();
      //  this.inclusaoAuxiliosTransporte = this.servicoCrudAT.getInclusaoAuxiliosTransporte();
      // this.atualizacaoAuxiliosTransporte = this.servicoCrudAT.getAtualizacaoAuxiliosTransporte();
      //  this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
  }

  downloadPDF() {
    return xepOnline.Formatter.Format('content', {render: 'download'});

  }
  getScreenshot() {

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
  loadExclusoesAuxiliosTransporte() {
    this.exclusoesAuxiliosTransporteService.findAll().subscribe(response => {this.exclusaoAuxiliosTransporte = response;
      console.log(this.exclusaoAuxiliosTransporte); this.loadMilitaresOnExclusao(this.exclusaoAuxiliosTransporte); } ,
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
