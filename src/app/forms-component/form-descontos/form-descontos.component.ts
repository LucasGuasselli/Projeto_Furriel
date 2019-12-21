import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitarDTO } from '../../models/militar.dto';
import { DespesaDTO } from '../../models/despesa.dto';
import { DespesasService } from '../../services/despesas.service';
import { UtilService } from '../../services/util.service';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';

@Component({
  selector: 'app-form-descontos',
  templateUrl: './form-descontos.component.html',
  styleUrls: ['./form-descontos.component.css']
})
export class FormDescontosComponent implements OnInit {

  militaresComAuxilioTransporte: MilitarDTO[] = [];
  despesa = new DespesaDTO();
  precCP: number;

  aditamentoAtual: AditamentoDTO = null;

  constructor(private militaresService: MilitaresService,
              private despesasService: DespesasService,
              private utilService: UtilService,
              private aditamentosService: AditamentosService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
        this.router.navigate(['/index']);
      }
    this.loadMilitaresComAuxilioTransporte();
  }

  saveDespesa() {
    if (isNaN(this.precCP)) {
      alert('Você precisa selecionar um militar!');
    } else {
        if (this.aditamentoAtual == null) {
          alert('Você precisa selecionar um aditamento!');
        } else {
          if (this.despesa.calculoDataInicio == null || this.despesa.calculoDataFim == null) {
              alert('Você deve informar as datas!');
          } else {
            if (this.despesa.motivo == null) {
              alert('Você deve selecionar um motivo!');
            } else {
              this.validDate();
              this.insertDespesa();
            }
          }
        }
      }
  }

  insertDespesa() {
    this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias(
      this.despesa.calculoDataInicio, this.despesa.calculoDataFim, this.despesa.motivo,
      this.despesa.feriados, this.despesa.administrativos);

    // console.log(this.data.setDate(this.data.getDay() + 2));
    this.despesa.militarPrecCP = this.precCP;
    this.despesa.aditamentoId = this.aditamentoAtual.id;
    // e necessario receber as datas antes dos calculos, pois elas podem ser alteradas para os calculos
      this.despesa.dataInicio = this.utilService.formatDate(this.despesa.calculoDataInicio.toString());
      this.despesa.dataFim = this.utilService.formatDate(this.despesa.calculoDataFim.toString());

      this.despesasService.insert(this.despesa).subscribe(response => { console.log(response);
      if (response.status === 201 ) { alert('Despesa Cadastrada com Sucesso!'); } } ,
        error => {console.log(error); });
  }

  validDate() {
    /*
    if (this.despesa.calculoDataInicio.getDate() > this.despesa.calculoDataFim.getDate()) {
        alert('A data de término deve ser maior ou igual a data de início!!!');
          this.despesa.calculoDataInicio = null;
          this.despesa.calculoDataFim = null;
    }
    */
  }

  calculateQuantidadeDias() {
    this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias(
      this.despesa.calculoDataInicio, this.despesa.calculoDataFim, this.despesa.motivo,
      this.despesa.feriados, this.despesa.administrativos);
  }

  savePrecCPMilitar(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
        console.log(this.precCP);
    }
  }

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => {this.militaresComAuxilioTransporte = response; console.log(this.militaresComAuxilioTransporte); } ,
        error => {console.log(error); } );
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
