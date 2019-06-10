import { Component, OnInit } from '@angular/core';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { ConducaoDTO } from '../../models/conducao.dto';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';

@Component({
  selector: 'app-tabela-auxilio-transporte',
  templateUrl: './tabela-auxilio-transporte.component.html',
  styleUrls: ['./tabela-auxilio-transporte.component.css']
})
export class TabelaAuxilioTransporteComponent implements OnInit {
  tituloAuxiliosNaoPublicados = 'AUXILIOS TRANSPORTE NAO PUBLICADOS';
  tituloAuxiliosTransportesPublicados = 'AUXILIOS TRANSPORTE PUBLICADOS';

  auxiliosTransporteSemPublicacao: AuxilioTransporteDTO[] = [];
  conducoesSemPublicacao: ConducaoDTO[] = [];

  auxilioTransportes: AuxilioTransporteDTO[] = [];
  conducoes: ConducaoDTO[] = [];
  constructor(private servico: CrudAuxilioTransporteService) { }

  ngOnInit() {
  //  this.auxilioTransportes = this.servico.getAT();
  //  this.auxiliosTransporteSemPublicacao = this.servico.getATSemPublicacao();
  //  this.conducoesSemPublicacao = this.servico.getConducoesSemPublicacao();
   // this.conducoes = this.servico.getConducoes();
  }

  removerConducao(conducao: ConducaoDTO) {
   // this.servico.removerConducao(conducao);
  }
}
