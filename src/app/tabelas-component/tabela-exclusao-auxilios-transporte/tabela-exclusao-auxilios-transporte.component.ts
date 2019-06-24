import { Component, OnInit } from '@angular/core';
import { ExclusaoAuxilioTransporteDTO } from '../../models/exclusaoAuxilioTransporte.dto';
import { ExclusoesAuxilioTransporteService } from '../../services/exclusaoAuxilioTransporte.service';

@Component({
  selector: 'app-tabela-exclusao-auxilios-transporte',
  templateUrl: './tabela-exclusao-auxilios-transporte.component.html',
  styleUrls: ['./tabela-exclusao-auxilios-transporte.component.css']
})
export class TabelaExclusaoAuxiliosTransporteComponent implements OnInit {

  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  constructor(private servicoExclusaoAuxilioTransporte: ExclusoesAuxilioTransporteService) { }

  ngOnInit() {
    //  this.exclusaoAuxiliosTransporte = this.servicoExclusaoAuxilioTransporte.getExclusaoAuxiliosTransporte();
  }

  removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO) {
   // this.servicoExclusaoAuxilioTransporte.removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte);
  }
}
