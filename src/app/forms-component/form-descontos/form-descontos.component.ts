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
      alert('Voce precisa selecionar um militar.');
    } else {
        if (this.aditamentoAtual == null) {
          alert('Voce precisa selecionar um aditamento!');
        } else {
          this.despesa.militarPrecCP = this.precCP;
          this.despesa.aditamentoId = this.aditamentoAtual.id;
          this.insertDespesa();
        }
    }
  }

  insertDespesa() {
    this.despesa.dataInicio = this.utilService.formatDate(this.despesa.dataInicio.toString());
    this.despesa.dataFim = this.utilService.formatDate(this.despesa.dataFim.toString());

      this.despesasService.insert(this.despesa).subscribe(response => { console.log(response); } ,
        error => {console.log(error); });
  }

  salvarPrecCPMilitar(precCP: number) {
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
