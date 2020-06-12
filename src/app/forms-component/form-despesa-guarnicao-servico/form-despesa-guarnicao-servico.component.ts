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
  selector: 'app-form-despesa-guarnicao-servico',
  templateUrl: './form-despesa-guarnicao-servico.component.html',
  styleUrls: ['./form-despesa-guarnicao-servico.component.css']
})
export class FormDespesaGuarnicaoServicoComponent implements OnInit {

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
    this.aditamentoAtual = this.aditamentosService.retornarAditamentoAtual();
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
        this.router.navigate(['/index']);
      }
    this.carregarMilitaresComAuxilioTransporte();
  }

  carregarMilitaresComAuxilioTransporte() {
    this.militaresService.retornarMilitaresComAuxilioTransporte().subscribe(
        response => { 
            this.militaresComAuxilioTransporte = response; this.separarMilitares(this.militaresComAuxilioTransporte);
        },
            error => {console.log(error); } );
  }

  // separa os militares por graduacao
  separarMilitares(militares: MilitarDTO[]) {
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

  salvarMilitar(militar: MilitarDTO, texto:  String) {
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

  validarDespesa() {
    if (this.despesa.calculoDataInicio == null) {
      alert('Você deve informar a data do Serviço!!!');
    } else {
      // tslint:disable-next-line:max-line-length
      if (this.adjunto != null || this.sgtDeDia != null || this.caboDeDia != null || this.plantao != null || this.plantao1 != null || this.plantao2 != null || this.plantao3 != null || this.plantao4 != null || this.plantao5 != null) {
        this.modificarDespesaFeriadoAdm();
        this.prepararDespesa();

          this.inserirDespesa(this.adjunto);
          this.inserirDespesa(this.sgtDeDia);
          this.inserirDespesa(this.caboDeDia);
          this.inserirDespesa(this.plantao);
          this.inserirDespesa(this.plantao1);
          this.inserirDespesa(this.plantao2);
          this.inserirDespesa(this.plantao3);
          this.inserirDespesa(this.plantao4);
          this.inserirDespesa(this.plantao5);

          alert(this.despesa.quantidadeDias + ' Dia(s) Descontado(s)');
             // this.ngOnInit();
      } else {
        alert('Você deve selecionar no PELO MENOS UM militar!!!');
      }
    }
  }

  prepararDespesa() {
        this.despesa.aditamentoId = this.aditamentoAtual.id;
        this.despesa.quantidadeDias = this.utilService.calcularQuantidadeDias( this.despesa.calculoDataInicio, this.despesa.calculoDataInicio, this.despesa.motivo = 'Serviço' , this.despesa.feriados, this.despesa.administrativos);

        // e necessario receber as datas antes dos calculos, pois elas podem ser alteradas para os calculos
          this.despesa.dataInicio = this.utilService.formatarData(this.despesa.calculoDataInicio.toString());
  }

  inserirDespesa(militar: MilitarDTO) {
    // e necessario o teste de null pois nao tem obrigatoriedade da regra de negocio cadastrar todos os possiveis militares de servico
    if ( militar != null) {
      this.despesa.militarPrecCP = militar.precCP;

      this.despesasService.inserir(this.despesa).subscribe(response => { 
        if (response.status !== 201 ) {
           alert('Erro ao cadastrar despesa do ' + militar.nome + 'Prec-CP ' + militar.precCP); } 
        } ,
          error => {console.log(error); });
    }
  }

  modificarDespesaFeriadoAdm() {
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

  cancelar() {
    this.router.navigate(['/index']);
  }

}
