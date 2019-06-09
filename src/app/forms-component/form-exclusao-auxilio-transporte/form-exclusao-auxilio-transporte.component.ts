import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { ExclusaoAuxilioTransporte } from '../../exclusao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { AuxilioTransporte } from '../../auxilio-transporte';
import { ExclusaoAuxilioTransporteDTO } from '../../models/exclusaoAuxilioTransporteDTO';
import { MilitarDTO } from '../../models/militar.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ExclusoesAuxiliosTransporteService } from '../../services/exclusaoAuxilioTransporte.service';
import { UtilService } from '../../services/util.service';


@Component({
  selector: 'app-form-exclusao-auxilio-transporte',
  templateUrl: './form-exclusao-auxilio-transporte.component.html',
  styleUrls: ['./form-exclusao-auxilio-transporte.component.css']
})
export class FormExclusaoAuxilioTransporteComponent implements OnInit {

  exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO = new ExclusaoAuxilioTransporteDTO();
  auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO();
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  aditamentoAtual: Aditamento;
  precCP: number;
  valor: number;

  constructor(private militaresService: MilitaresService,
              private servicoCrudAditamento: CrudAditamentosService,
              private auxilioTransporteService: AuxiliosTransporteService,
              private exclusaoAuxilioTransporteService: ExclusoesAuxiliosTransporteService,
              private router: Router, private rota: ActivatedRoute,
              private utilService: UtilService ) { }

  ngOnInit() {
      this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();
      this.loadMilitaresComAuxilioTransporte();
  }

  saveExclusaoAuxilioTransporte() {
    if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
    } else {
        if (isNaN(this.precCP)) {
            alert('selecione um militar!');
        } else {
          this.auxilioTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
            response => {this.auxilioTransporte = response; this.insertExclusaoAuxilioTransporte(
              this.precCP, this.aditamentoAtual.codAditamento, this.auxilioTransporte); } ,
            error => {console.log(error); }
          );

        }
      }
  }

  insertExclusaoAuxilioTransporte(precCP: number, aditamentoId: number, auxilioTransporte: AuxilioTransporteDTO) {
      this.exclusaoAuxilioTransporte.data = this.utilService.formatDate(this.exclusaoAuxilioTransporte.data.toString());
      this.exclusaoAuxilioTransporte.militarPrecCP = precCP;
      this.exclusaoAuxilioTransporte.aditamentoId = aditamentoId;
      this.exclusaoAuxilioTransporte.valor = auxilioTransporte.valorTotalAT;
      this.exclusaoAuxilioTransporteService.insert(this.exclusaoAuxilioTransporte).subscribe(
            response => {console.log(response); console.log(this.exclusaoAuxilioTransporte);
            this.deleteAuxilioTransporte(auxilioTransporte); }, error => {console.log(error); }
      );
  }

  deleteAuxilioTransporte(auxilioTransporte: AuxilioTransporteDTO) {
    // auxilio nao esta sendo deletado do banco, provavelmente problema nas relacoes e no CASCADE
      this.auxilioTransporteService.delete(auxilioTransporte).subscribe( response => { console.log(response); },
      error => {console.log(error); } );
  }

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => {this.militaresComAuxilioTransporte = response; console.log(this.militaresComAuxilioTransporte); } ,
        error => {console.log(error); } );
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

  /*
  salvarExclusaoAuxilioTransporte() {
    if (isNaN(this.precCP)) {
      // tratar o erro
    } else {
      this.exclusaoAuxilioTransporte.precCP = this.precCP;
      this.auxilioTransporte = this.servicoCrudAuxilioTransporte.getAuxilioTransportePorPrecCP(this.precCP);
      // VERIFICAR ESTA LINHA ABAIXO, POSSIVEIS ATRIBUTOS ERRADOS
      this.exclusaoAuxilioTransporte.codAditamento = this.aditamentoAtual.codAditamento;

      this.servicoCrudAuxilioTransporte.adiocionarExclusaoAuxilioTransporte(this.exclusaoAuxilioTransporte);

      // depois de adicionar na tabela do aditamento, deve ser excluido o auxilio transporte correspondente
      this.servicoCrudAuxilioTransporte.excluirAuxilioTransporte(this.precCP);
      this.exclusaoAuxilioTransporte = new ExclusaoAuxilioTransporte();
    }
  }
*/
}
