import { Component, OnInit } from '@angular/core';
import { ExclusaoAuxilioTransporte } from '../exclusao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';

@Component({
  selector: 'app-tabela-exclusao-auxilios-transporte',
  templateUrl: './tabela-exclusao-auxilios-transporte.component.html',
  styleUrls: ['./tabela-exclusao-auxilios-transporte.component.css']
})
export class TabelaExclusaoAuxiliosTransporteComponent implements OnInit {

  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporte[] = [];
  constructor(private servicoExclusaoAuxilioTransporte: CrudAuxilioTransporteService) { }

  ngOnInit() {
      this.exclusaoAuxiliosTransporte = this.servicoExclusaoAuxilioTransporte.getExclusaoAuxilioTransporte();
  }

  removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte) {
    this.servicoExclusaoAuxilioTransporte.removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte);
  }
}
