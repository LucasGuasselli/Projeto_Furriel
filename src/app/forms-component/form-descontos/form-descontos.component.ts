import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { Aditamento } from '../../aditamento';
import { MilitarDTO } from '../../models/militar.dto';
import { DespesaDTO } from '../../models/despesa.dto';
import { DespesasService } from '../../services/despesas.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-form-descontos',
  templateUrl: './form-descontos.component.html',
  styleUrls: ['./form-descontos.component.css']
})
export class FormDescontosComponent implements OnInit {

  militaresComAuxilioTransporte: MilitarDTO[] = [];
  despesa = new DespesaDTO();
  precCP: number;

  aditamentoAtual: Aditamento = new Aditamento;

  constructor(private militaresService: MilitaresService,
              private despesasService: DespesasService,
              private utilService: UtilService,
              private servicoCrudAditamento: CrudAditamentosService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
      this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();
      this.aditamentoAtual.codAditamento = 1;
      // tslint:disable-next-line:no-unused-expression
      Date.parse;
      this.loadMilitaresComAuxilioTransporte();

      if (isNaN(this.precCP)) {
        // CADASTRAR
      } else {
        // EDITAR
        // this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
        // this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));
      }
  }

  saveDespesa() {
    if (isNaN(this.precCP)) {
      alert('Voce precisa selecionar um militar.');
    } else {
        if (this.aditamentoAtual == null) {
          alert('Voce precisa selecionar um aditamento!');
        } else {
          this.despesa.militarPrecCP = this.precCP;
          this.despesa.aditamentoId = this.aditamentoAtual.codAditamento;
          this.insertDespesa();
            // salvando
        //    this.desconto = new Desconto();
        }
    }
  }

  insertDespesa() {
    this.despesa.dataInicio = this.utilService.formatDate(this.despesa.dataInicio.toString());
    this.despesa.dataFim = this.utilService.formatDate(this.despesa.dataFim.toString());

    console.log(this.despesa.dataInicio);
    console.log(this.despesa.dataFim);
      this.despesasService.insert(this.despesa).subscribe(response => { console.log('Despesa cadastrada com sucesso!'); } ,
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
