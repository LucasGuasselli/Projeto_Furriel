import { Component, OnInit } from '@angular/core';
import { AuxilioTransporte } from '../auxilio-transporte';
import { Conducao } from '../conducao';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service'; 

@Component({
  selector: 'app-tabela-auxilio-transporte',
  templateUrl: './tabela-auxilio-transporte.component.html',
  styleUrls: ['./tabela-auxilio-transporte.component.css']
})
export class TabelaAuxilioTransporteComponent implements OnInit {

auxilioTransportes:AuxilioTransporte[] = [];
conducoes:Conducao[] = []
  constructor(private servico:CrudAuxilioTransporteService) { }

  ngOnInit() {
    this.auxilioTransportes = this.servico.getAT();
    this.conducoes = this.servico.getConducoes();
  }

}
