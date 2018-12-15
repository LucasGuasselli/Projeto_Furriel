import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

      doc.fromHTML(content.innerHTML, 15, 15, {
          'width': 190,
          'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');
  }
}
