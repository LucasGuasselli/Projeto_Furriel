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
  aditamentoAtual: Aditamento = null;
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
        alert('Voce precisa selecionar um militar.');
    } else {
      if (this.aditamentoAtual == null) {
        alert('Voce precisa selecionar um aditamento!');
      } else {
        this.exclusaoAuxilioTransporte.precCP = this.precCP;
        this.auxilioTransporte = this.servicoCrudAuxilioTransporte.getAuxilioTransportePorPrecCP(this.precCP);
        this.exclusaoAuxilioTransporte.valor = this.auxilioTransporte.valorTotalAT;

        this.exclusaoAuxilioTransporte.codAditamento = this.aditamentoAtual.codAditamento;

        this.servicoCrudAuxilioTransporte.adiocionarExclusaoAuxilioTransporte(this.exclusaoAuxilioTransporte);

        // tslint:disable-next-line:prefer-const
        let nome = this.servicoCrudMilitares.getNomeMilitarPorPrecCP(this.precCP);
        alert('O auxílio transporte do ' + nome + ' foi excluído com sucesso');

        // depois de adicionar na tabela do aditamento, deve ser excluido o auxilio transporte correspondente
        this.servicoCrudAuxilioTransporte.excluirAuxilioTransporte(this.precCP);
        this.exclusaoAuxilioTransporte = new ExclusaoAuxilioTransporte();
      }
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
