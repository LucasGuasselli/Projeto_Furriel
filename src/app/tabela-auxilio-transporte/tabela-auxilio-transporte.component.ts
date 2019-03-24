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
  tituloAuxiliosNaoPublicados = 'AIXILIOS TRANSPORTE NAO PUBLICADOS';
  tituloAuxiliosTransportesPublicados = 'AUXILIOS TRANSPORTE PUBLICADOS';

  auxiliosTransporteSemPublicacao: AuxilioTransporte[] = [];
  conducoesSemPublicacao: Conducao[] = [];

  auxilioTransportes: AuxilioTransporte[] = [];
  conducoes: Conducao[] = [];
  constructor(private servico: CrudAuxilioTransporteService) { }

  ngOnInit() {
    this.auxilioTransportes = this.servico.getAT();
    this.auxiliosTransporteSemPublicacao = this.servico.getATSemPublicacao();
    this.conducoesSemPublicacao = this.servico.getConducoesSemPublicacao();
    this.conducoes = this.servico.getConducoes();
  }

  removerConducao(conducao: Conducao) {
    this.servico.removerConducao(conducao);
  }
}
