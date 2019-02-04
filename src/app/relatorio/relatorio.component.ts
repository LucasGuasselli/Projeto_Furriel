import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { CrudMilitaresService } from '../crud-militares.service';
import { Desconto } from '../desconto';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  militares: Militar[] = [];
  enderecos: Endereco[] = [];
  descontos: Desconto[] = [];


  constructor(private servicoCrudMilitar: CrudMilitaresService, private servicoCrudAT: CrudAuxilioTransporteService) { }

  ngOnInit() {
      this.militares = this.servicoCrudMilitar.getMilitares();
      this.enderecos = this.servicoCrudMilitar.getEnderecos();
      this.descontos = this.servicoCrudAT.getDescontos();

  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('content') content: ElementRef;

  public downloadPDF() {

      let doc = new jsPDF();


      let specialElementHandlers = {
          '#editor': function(element, renderer) {
              return true;
          }
      };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 3, 3, {
          'width': 150 ,
          'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');
  }
}
