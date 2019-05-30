import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { MilitaresService } from '../services/militares.service';
import { Desconto } from '../desconto';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { PagamentoAtrasado } from '../pagamento-atrasado';
import { CrudPagamentoAtrasadoService } from '../crud-pagamento-atrasado.service';
import { ExclusaoAuxilioTransporte } from '../exclusao-auxilio-transporte';
import { InclusaoAuxilioTransporte } from '../inclusao-auxilio-transporte';
import { AtualizacaoAuxilioTransporte } from '../atualizacao-auxilio-transporte';
import { DespesaDTO } from '../models/despesa.dto';
import { MilitarDTO } from '../models/militar.dto';
import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';
import { PostosGraduacoesService } from '../services/postosGraduacoes.service';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: MilitarDTO[] = [];
  despesas: DespesaDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  inclusaoAuxiliosTransporte: InclusaoAuxilioTransporte[] = [];
  atualizacaoAuxiliosTransporte: AtualizacaoAuxilioTransporte[] = [];
  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporte[] = [];
  pagamentosAtrasados: PagamentoAtrasado[] = [];

  texto: String = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  constructor(private militaresService: MilitaresService,
              private servicoCrudAT: CrudAuxilioTransporteService,
              private servicoCrudPagamentoAtrasado: CrudPagamentoAtrasadoService,
              private postosGraduacoesService: PostosGraduacoesService,
              private despesasService: DespesasService) { }

  ngOnInit() {

    this.carregaDespesas();

      // this.militares = this.militaresService.getMilitares();
      // this.enderecos = this.militaresService.getEnderecos();
      // this.descontos = this.servicoCrudAT.getDescontos();
      //  this.inclusaoAuxiliosTransporte = this.servicoCrudAT.getInclusaoAuxiliosTransporte();
      // this.atualizacaoAuxiliosTransporte = this.servicoCrudAT.getAtualizacaoAuxiliosTransporte();
      //  this.exclusaoAuxiliosTransporte = this.servicoCrudAT.getExclusaoAuxiliosTransporte();
      //  this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
  }

  downloadPDF() {
    return xepOnline.Formatter.Format('content', {render: 'download'});

  }
  getScreenshot() {

  }

  carregaDespesas() {
    this.despesasService.findAll().subscribe(response => {this.despesas = response;
    console.log(this.despesas); this.atribuiMilitares(this.despesas); } ,
      error => {console.log(error); } );
  }

  atribuiMilitares(despesas: DespesaDTO[]) {
    for (let i = 0; i < despesas.length; i++) {
        this.militaresService.findMilitarByPrecCP(this.despesas[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; despesas[i].nome = this.militares[i].nome;
                      this.atribuiGraduacoes(this.despesas[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  atribuiGraduacoes(despesa: DespesaDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; despesa.graduacao = this.postoGraduacao.nome; },
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
