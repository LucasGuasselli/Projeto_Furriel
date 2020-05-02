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
  selector: 'app-form-despesas',
  templateUrl: './form-despesas.component.html',
  styleUrls: ['./form-despesas.component.css']
})
export class FormDespesasComponent implements OnInit {

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

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => { 
          this.militaresComAuxilioTransporte = response; 
        },
          error => {console.log(error); } );
  }

  validateDespesa() {
    if (isNaN(this.precCP)) {
      alert('Você precisa selecionar um militar!');
    } else {
        if (this.aditamentoAtual == null) {
          alert('Você precisa selecionar um aditamento!');
        } else {
          if (this.despesa.calculoDataInicio == null || this.despesa.calculoDataFim == null) {
              alert('Você deve informar as datas!');
          } else {
            if (this.despesa.motivo == null || this.despesa.motivo == 'não houve despesa') {
              alert('Você deve selecionar um motivo!');
            } else {
            //  this.validateDate();
              this.beforeInsertDespesa();
            }
          }
        }
      }
  }

  validateDate() {
     console.log(this.utilService.formatDate(this.despesa.calculoDataInicio.toString()));

     // console.log(this.despesa.calculoDataInicio.toString());
     // console.log(this.despesa.calculoDataFim.toString());
    /*
    if (this.despesa.calculoDataInicio.getDate() > this.despesa.calculoDataFim.getDate()) {
        alert('A data de término deve ser maior ou igual a data de início!!!');
          this.despesa.calculoDataInicio = null;
          this.despesa.calculoDataFim = null;
    }
    */
  }

  beforeInsertDespesa() {
    this.despesa.aditamentoId = this.aditamentoAtual.id;
    this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias( this.despesa.calculoDataInicio, this.despesa.calculoDataFim, this.despesa.motivo, this.despesa.feriados, this.despesa.administrativos);
    this.despesa.militarPrecCP = this.precCP;
    // console.log(this.data.setDate(this.data.getDay() + 2));

    // e necessario receber as datas antes dos calculos, pois elas podem ser alteradas para os calculos
      this.despesa.dataInicio = this.utilService.formatDate(this.despesa.calculoDataInicio.toString());
      this.despesa.dataFim = this.utilService.formatDate(this.despesa.calculoDataFim.toString());
        this.insertDespesa();
  }

  insertDespesa() {
      this.despesasService.insert(this.despesa).subscribe(response => { 
          if (response.status === 201 ) { alert('Despesa Cadastrada com Sucesso!'); }
        },
          error => {console.log(error); });
  }

  calculateQuantidadeDias() {
    this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias( this.despesa.calculoDataInicio, this.despesa.calculoDataFim, this.despesa.motivo, this.despesa.feriados, this.despesa.administrativos);
      console.log('Quantidade de dias: ' + this.despesa.quantidadeDias);
        console.log('Data Inicio ' + this.despesa.calculoDataInicio );
            console.log('Data Fim ' + this.despesa.calculoDataFim );
  }

  savePrecCPMilitar(precCP: number) {
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
