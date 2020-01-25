import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentosService } from '../../services/aditamentos.service';
import { DespesaDTO } from '../../models/despesa.dto';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { MilitaresService } from '../../services/militares.service';
import { DespesasService } from '../../services/despesas.service';
import { UtilService } from '../../services/util.service';
import { MilitarDTO } from '../../models/militar.dto';

@Component({
  selector: 'app-form-descontos-feriados-adm',
  templateUrl: './form-descontos-feriados-adm.component.html',
  styleUrls: ['./form-descontos-feriados-adm.component.css']
})
export class FormDescontosFeriadosAdmComponent implements OnInit {

  aditamentoAtual: AditamentoDTO = null;
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  despesa = new DespesaDTO();
  precCP: number;

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
  }

  validateDespesa() {
    if (this.despesa.calculoDataInicio == null) {
      alert('Você deve informar as datas!');
    } else {
      if (this.despesa.motivo == null) {
        alert('Você deve selecionar um motivo!');
      } else {
        this.beforeLoadMilitares();
        this.loadMilitaresComAuxilioTransporte();
      }
    }
  }

  beforeLoadMilitares() {
     this.despesa.aditamentoId = this.aditamentoAtual.id;
     // data inicial e data fim sao iguais pois e cadastrado um dia de feriado ou adm por vez.
       this.despesa.calculoDataFim = this.despesa.calculoDataInicio;
     // calcula a quantidade de dias conforme regra de negocio  
     this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias(this.despesa.calculoDataInicio, this.despesa.calculoDataFim, this.despesa.motivo, this.despesa.feriados, this.despesa.administrativos);
     // formatando as datas para o padrao DD/MM/YYYY
     this.despesa.dataInicio = this.utilService.formatDate(this.despesa.calculoDataInicio.toString());
     this.despesa.dataFim = this.utilService.formatDate(this.despesa.calculoDataFim.toString());
  }

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => { 
          this.militaresComAuxilioTransporte = response; this.insertDespesa(this.militaresComAuxilioTransporte); 
        } ,
          error => {console.log(error); } );
  }

  insertDespesa(militares: MilitarDTO[]) {
    let contador = 0;
      for (let i = 0; i < militares.length; i++) {
          this.despesa.militarPrecCP = militares[i].precCP;
            this.despesasService.insert(this.despesa).subscribe( 
              response => { 
                if (response.status === 201) { contador += 1; }
                if (contador === militares.length) { alert('Despesas Cadastradas com Sucesso!'); }
              }, error => {console.log(error); }
            );
      }
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
