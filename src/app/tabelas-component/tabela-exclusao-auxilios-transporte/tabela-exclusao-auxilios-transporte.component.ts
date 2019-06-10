import { Component, OnInit } from '@angular/core';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { ExclusaoAuxilioTransporteDTO } from '../../models/exclusaoAuxilioTransporte.dto';

@Component({
  selector: 'app-tabela-exclusao-auxilios-transporte',
  templateUrl: './tabela-exclusao-auxilios-transporte.component.html',
  styleUrls: ['./tabela-exclusao-auxilios-transporte.component.css']
})
export class TabelaExclusaoAuxiliosTransporteComponent implements OnInit {

  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  constructor(private servicoExclusaoAuxilioTransporte: CrudAuxilioTransporteService) { }

  ngOnInit() {
    //  this.exclusaoAuxiliosTransporte = this.servicoExclusaoAuxilioTransporte.getExclusaoAuxiliosTransporte();
  }

  removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO) {
   // this.servicoExclusaoAuxilioTransporte.removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte);
  }
}
