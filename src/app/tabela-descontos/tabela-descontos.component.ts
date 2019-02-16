import { Component, OnInit } from '@angular/core';
import { Desconto } from '../desconto';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';

@Component({
  selector: 'app-tabela-descontos',
  templateUrl: './tabela-descontos.component.html',
  styleUrls: ['./tabela-descontos.component.css']
})
export class TabelaDescontosComponent implements OnInit {

  descontos: Desconto[] = [];
  constructor(private servicoCrudAT: CrudAuxilioTransporteService) { }

  ngOnInit() {
      this.descontos = this.servicoCrudAT.getDescontos();

      for (let i = 0; i < this.descontos.length; i++) {
          console.log(this.descontos[i]);
      }
  }
}
