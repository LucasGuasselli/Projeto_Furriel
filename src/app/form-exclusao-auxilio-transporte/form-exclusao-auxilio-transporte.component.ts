import { Component, OnInit } from '@angular/core';
import { CrudMilitaresService } from '../crud-militares.service';
import { Militar } from '../militar';
import { ExclusaoAuxilioTransporte } from '../exclusao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Aditamento } from '../aditamento';
import { CrudAditamentosService } from '../crud-aditamentos.service';
import { AuxilioTransporte } from '../auxilio-transporte';


@Component({
  selector: 'app-form-exclusao-auxilio-transporte',
  templateUrl: './form-exclusao-auxilio-transporte.component.html',
  styleUrls: ['./form-exclusao-auxilio-transporte.component.css']
})
export class FormExclusaoAuxilioTransporteComponent implements OnInit {

  exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte;
  aditamentoAtual: Aditamento;
  precCP: number;
  valorAuxilioTransporte: number;
  auxilioTransporte: AuxilioTransporte;
  militares: Militar[] = [];


  constructor(private servicoCrudMilitares: CrudMilitaresService, private servicoCrudAuxilioTransporte: CrudAuxilioTransporteService,
    private servicoCrudAditamento: CrudAditamentosService, private router: Router, private rota: ActivatedRoute ) { }

  ngOnInit() {
      this.militares = this.servicoCrudMilitares.getMilitares();
      this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();
      this.exclusaoAuxilioTransporte = new ExclusaoAuxilioTransporte();
  }

  salvarExclusaoAuxilioTransporte() {
    if (isNaN(this.precCP)) {
      // tratar o erro
    } else {
      this.exclusaoAuxilioTransporte.precCP = this.precCP;
      this.auxilioTransporte = this.servicoCrudAuxilioTransporte.getAuxilioTransportePorPrecCP(this.precCP);
      this.exclusaoAuxilioTransporte.codAditamento = this.auxilioTransporte.codAT;

      this.servicoCrudAuxilioTransporte.adiocionarExclusaoAuxilioTransporte(this.exclusaoAuxilioTransporte);

      // depois de adicionar na tabela do aditamento, deve ser excluido o auxilio transporte correspondente
      this.servicoCrudAuxilioTransporte.excluirAuxilioTransporte(this.precCP);

      this.exclusaoAuxilioTransporte = new ExclusaoAuxilioTransporte();
    }
  }

  salvarPrecCPMilitar(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
        console.log(this.precCP);
    }
  }
  cancelar() {
    this.router.navigate(['/index']);
  }
}
