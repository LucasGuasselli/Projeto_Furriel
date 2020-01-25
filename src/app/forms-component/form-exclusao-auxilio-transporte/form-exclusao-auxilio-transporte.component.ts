import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExclusaoAuxilioTransporteDTO } from '../../models/exclusaoAuxilioTransporte.dto';
import { MilitarDTO } from '../../models/militar.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ExclusoesAuxilioTransporteService } from '../../services/exclusaoAuxilioTransporte.service';
import { UtilService } from '../../services/util.service';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';


@Component({
  selector: 'app-form-exclusao-auxilio-transporte',
  templateUrl: './form-exclusao-auxilio-transporte.component.html',
  styleUrls: ['./form-exclusao-auxilio-transporte.component.css']
})
export class FormExclusaoAuxilioTransporteComponent implements OnInit {
  titulo = 'Exclusão de Auxílio Transporte';

  exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO = new ExclusaoAuxilioTransporteDTO();
  auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO();
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  aditamentoAtual: AditamentoDTO = null;
  precCP: number;
  valor: number;

  constructor(private militaresService: MilitaresService,
              private aditamentosService: AditamentosService,
              private auxilioTransporteService: AuxiliosTransporteService,
              private exclusaoAuxilioTransporteService: ExclusoesAuxilioTransporteService,
              private router: Router, private rota: ActivatedRoute,
              private utilService: UtilService ) { }

  ngOnInit() {
      this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
        if ( this.aditamentoAtual == null)    {
          alert('Selecione um aditamento!');
            this.router.navigate(['/index']);
        }
        this.loadMilitaresComAuxilioTransporte();
  }

  validateExclusaoAuxilioTransporte() {
    if ( this.exclusaoAuxilioTransporte.data == null)    {
        alert('Selecione uma data!');
    } else {
        if (isNaN(this.precCP)) {
            alert('selecione um militar!');
        } else {
          this.loadAuxilioTransporte();
        }
      }
  }

  loadAuxilioTransporte() {
      this.auxilioTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
            response => {
              this.auxilioTransporte = response; 
              this.beforinsertExclusaoAuxilioTransporte(this.precCP, this.aditamentoAtual.id, this.auxilioTransporte); 
            },
              error => {console.log(error); } );
  }

  beforinsertExclusaoAuxilioTransporte(precCP: number, aditamentoId: number, auxilioTransporte: AuxilioTransporteDTO){
      this.exclusaoAuxilioTransporte.data = this.utilService.formatDate(this.exclusaoAuxilioTransporte.data.toString());
      this.exclusaoAuxilioTransporte.militarPrecCP = precCP;
      this.exclusaoAuxilioTransporte.aditamentoId = aditamentoId;
      this.exclusaoAuxilioTransporte.valor = auxilioTransporte.valorTotalAT;
        this.insertExclusaoAuxilioTransporte(auxilioTransporte);
  }

// INVERTER LOGICA, PRIMEIRO EXCLUIR E CASO TENHA SIDO EXCLUIDO COM SUCESSO, CADASTRAR EXCLUSAOAUXILIOTRANSPORTE
  insertExclusaoAuxilioTransporte(auxilioTransporte: AuxilioTransporteDTO) {      
        this.exclusaoAuxilioTransporteService.insert(this.exclusaoAuxilioTransporte).subscribe(
          response => { 
            if (response.status === 201) {
              alert('Exclusão Cadastrada com Sucesso!');
            } 
              this.deleteAuxilioTransporte(auxilioTransporte); 
            }, 
              error => { console.log(error); }
        );
  }

  deleteAuxilioTransporte(auxilioTransporte: AuxilioTransporteDTO) {
    auxilioTransporte.exclusao = true;
    this.auxilioTransporteService.update(auxilioTransporte, auxilioTransporte.id).subscribe( 
        response => { 
            console.log(response);
            if (response.status === 204) {
              this.loadMilitaresComAuxilioTransporte(); 
            }
              this.moveToReadExclusoesAuxilioTransporte();
        },
          error => { console.log(error); } 
      );
  }

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => { this.militaresComAuxilioTransporte = response; console.log(this.militaresComAuxilioTransporte); } ,
          error => {console.log(error); } );
  }

  saveMilitarPrecCP(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
        console.log(this.precCP);
    }
  }

  moveToReadExclusoesAuxilioTransporte() {
    this.router.navigate(['/listaExclusaoAuxiliosTransporte']);
  }

  cancel() {
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
