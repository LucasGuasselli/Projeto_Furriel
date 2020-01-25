import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DespesaDTO } from '../../models/despesa.dto';
import { UtilService } from '../../services/util.service';
import { DespesasService } from '../../services/despesas.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-desconto-guarnicao-servico',
  templateUrl: './form-desconto-guarnicao-servico.component.html',
  styleUrls: ['./form-desconto-guarnicao-servico.component.css']
})
export class FormDescontoGuarnicaoServicoComponent implements OnInit {

  // arrays
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  adjuntos: MilitarDTO[] = [];
  sargentosDeDia: MilitarDTO[] = [];
  cabosDeDia: MilitarDTO[] = [];
  plantoes: MilitarDTO[] = [];

  // objetos selecionados para cadastrar desconto
  adjunto: MilitarDTO;
  sgtDeDia: MilitarDTO;
  caboDeDia: MilitarDTO;
  plantao: MilitarDTO;
  plantao1: MilitarDTO;
  plantao2: MilitarDTO;
  plantao3: MilitarDTO;
  plantao4: MilitarDTO;
  plantao5: MilitarDTO;

  guarnicaoDeServico: MilitarDTO[] = [];

  despesa: DespesaDTO = new DespesaDTO;
  aditamentoAtual: AditamentoDTO;
  feriado: Boolean = false;
  administrativo: Boolean = false;

  constructor(private militaresService: MilitaresService,
              private aditamentosService: AditamentosService,
              private despesasService: DespesasService,
              private utilService: UtilService,
              private router: Router) { }

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
            this.militaresComAuxilioTransporte = response; this.splitMilitares(this.militaresComAuxilioTransporte);
        },
            error => {console.log(error); } );
  }

  // separa os militares por graduacao
  splitMilitares(militares: MilitarDTO[]) {
      for (let i = 0; i < militares.length; i++) {
        // 1º Sargentos concorrem a escala de adjunto
          if (militares[i].postoGraduacaoId === 6) {
            this.adjuntos.push(militares[i]);
          }
        // 2º e 3º Sargentos concorrem a escala de sargento de dia
          if (militares[i].postoGraduacaoId === 5 || militares[i].postoGraduacaoId === 4 ) {
              this.sargentosDeDia.push(militares[i]);
          }
        // cabos concorrem a escala de cabo de dia  
          if (militares[i].postoGraduacaoId === 3 ) {
            this.cabosDeDia.push(militares[i]);
          }
        // soldados EP e EV concorrem a escala de plantao  
          if (militares[i].postoGraduacaoId === 2 || militares[i].postoGraduacaoId === 1 ) {
            this.plantoes.push(militares[i]);
          }
      }
  }

  saveMilitar(militar: MilitarDTO, texto:  String) {
    switch (texto) {
      case 'Adjunto': {
        this.adjunto = militar;
          break;
      }
      case 'Sargento': {
        this.sgtDeDia = militar;
          break;
      }
      case 'Cabo': {
        this.caboDeDia = militar;
          break;
      }
      case 'Plantao': {
        this.plantao = militar;
          break;
      }
      case 'Plantao1': {
        this.plantao1 = militar;
          break;
      }
      case 'Plantao2': {
        this.plantao2 = militar;
          break;
      }
    }
  }

  validateDespesa() {
    if (this.despesa.calculoDataInicio == null) {
      alert('Você deve informar a data do Serviço!!!');
    } else {
      // tslint:disable-next-line:max-line-length
      if (this.adjunto != null || this.sgtDeDia != null || this.caboDeDia != null || this.plantao != null || this.plantao1 != null || this.plantao2 != null || this.plantao3 != null || this.plantao4 != null || this.plantao5 != null) {
        this.modifyDespesaFeriadoAdm();
        this.beforeInsertDespesa();

          this.insertDespesa(this.adjunto);
          this.insertDespesa(this.sgtDeDia);
          this.insertDespesa(this.caboDeDia);
          this.insertDespesa(this.plantao);
          this.insertDespesa(this.plantao1);
          this.insertDespesa(this.plantao2);
          this.insertDespesa(this.plantao3);
          this.insertDespesa(this.plantao4);
          this.insertDespesa(this.plantao5);

          alert(this.despesa.quantidadeDias + ' Dia(s) Descontado(s)');
             // this.ngOnInit();
      } else {
        alert('Você deve selecionar no PELO MENOS UM militar!!!');
      }
    }
  }

  beforeInsertDespesa() {
        this.despesa.aditamentoId = this.aditamentoAtual.id;
        this.despesa.quantidadeDias = this.utilService.calculaQuantidadeDias( this.despesa.calculoDataInicio, this.despesa.calculoDataInicio, this.despesa.motivo = 'Serviço' , this.despesa.feriados, this.despesa.administrativos);

        // e necessario receber as datas antes dos calculos, pois elas podem ser alteradas para os calculos
          this.despesa.dataInicio = this.utilService.formatDate(this.despesa.calculoDataInicio.toString());
  }

  insertDespesa(militar: MilitarDTO) {
    // e necessario o teste de null pois nao tem obrigatoriedade da regra de negocio cadastrar todos os possiveis militares de servico
    if ( militar != null) {
      this.despesa.militarPrecCP = militar.precCP;

      this.despesasService.insert(this.despesa).subscribe(response => { 
        if (response.status !== 201 ) {
           alert('Erro ao cadastrar despesa do ' + militar.nome + 'Prec-CP ' + militar.precCP); } 
        } ,
          error => {console.log(error); });
    }
  }

  modifyDespesaFeriadoAdm() {
    if (this.feriado === true) {
        this.despesa.feriados = 1;
        this.despesa.administrativos = 0;
    } else if (this.administrativo === true) {
        this.despesa.feriados = 0;
        this.despesa.administrativos = 1;
    } else {
        this.despesa.feriados = 0;
        this.despesa.administrativos = 0;
    }
  }

  // DESENVOLVER METODO LIMPAR ( tornar todos campos null)

  cancel() {
    this.router.navigate(['/index']);
  }

}
