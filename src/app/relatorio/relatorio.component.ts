import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { CrudMilitaresService } from '../crud-militares.service';
import { Desconto } from '../desconto';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { PagamentoAtrasado } from '../pagamento-atrasado';
import { CrudPagamentoAtrasadoService } from '../crud-pagamento-atrasado.service';
import { ExclusaoAuxilioTransporte } from '../exclusao-auxilio-transporte';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: Militar[] = [];
  enderecos: Endereco[] = [];
  descontos: Desconto[] = [];
  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporte[] = [];
  pagamentosAtrasados: PagamentoAtrasado[] = [];


  constructor(private servicoCrudMilitar: CrudMilitaresService, private servicoCrudAT: CrudAuxilioTransporteService,
            private servicoCrudPagamentoAtrasado: CrudPagamentoAtrasadoService) { }

  ngOnInit() {
        this.militares = this.servicoCrudMilitar.getMilitares();
        this.enderecos = this.servicoCrudMilitar.getEnderecos();
        this.descontos = this.servicoCrudAT.getDescontos();
        this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
        this.exclusaoAuxiliosTransporte = this.servicoCrudAT.getExclusaoAuxilioTransporte();
  }

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

      doc.fromHTML(content.innerHTML, 3, 3, {
          'width': 150 ,
          'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');
  }
}
