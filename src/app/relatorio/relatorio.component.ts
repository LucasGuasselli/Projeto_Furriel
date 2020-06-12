import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MilitaresService } from '../services/militares.service';
import { DespesaDTO } from '../models/despesa.dto';
import { MilitarDTO } from '../models/militar.dto';
import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';
import { PostosGraduacoesService } from '../services/postosGraduacoes.service';
import { DespesasService } from '../services/despesas.service';
import { ExclusoesAuxilioTransporteService } from '../services/exclusaoAuxilioTransporte.service';
import { ExclusaoAuxilioTransporteDTO } from '../models/exclusaoAuxilioTransporte.dto';
import { SaqueAtrasadoDTO } from '../models/saqueAtrasado.dto';
import { InclusaoAuxilioTransporteDTO } from '../models/inclusaoAuxilioTransporte.dto';
import { InclusoesAuxilioTransporteService } from '../services/inclusoesAuxilioTransporte.service';
import { SaquesAtrasadosService } from '../services/saquesAtrasados.service';
import { AtualizacaoAuxilioTransporteDTO } from '../models/atualizacaoAuxilioTransporte.dto';
import { AtualizacoesAuxilioTransporteService } from '../services/atualizacoesAuxilioTransporte.service';
import { AditamentoDTO } from '../models/aditamento.dto';
import { AditamentosService } from '../services/aditamentos.service';
import { Router } from '@angular/router';

// sem esta declaracao o sistema nao gera o PDF
declare var xepOnline: any;
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})


export class RelatorioComponent implements OnInit {
  // xepOnline: any;

  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  despesa: DespesaDTO = new DespesaDTO;
  despesas: DespesaDTO[] = [];
  despesasSomadas: DespesaDTO[] = [];
  militaresSemDespesas: DespesaDTO[] = [];
  inclusoesAuxilioTransporte: InclusaoAuxilioTransporteDTO[] = [];
  atualizacoesAuxilioTransporte: AtualizacaoAuxilioTransporteDTO[] = [];
  exclusoesAuxilioTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  saquesAtrasados: SaqueAtrasadoDTO[] = [];

  displayedColumnsDespesas: string[] = ['graduacaoNome', 'precCP', 'quantidadeDias', 'valor', 'motivo'];
  displayedColumnsInclusoes: string[] = ['graduacaoNome', 'precCP', 'dataInicio', 'valor'];
  displayedColumnsAtualizacoes: string[] = ['graduacaoNome', 'precCP', 'dataInicio', 'valor', 'motivo'];
  displayedColumnsExclusoes: string[] = ['graduacaoNome', 'precCP', 'dataInicio', 'valor', 'motivo'];
  displayedColumnsPagamentosAtrasados: string[] = ['graduacaoNome', 'precCP', 'mesReferencia', 'dataInicio', 'valor', 'motivo'];


  dataSourceDespesas;
  dataSourceMilitaresSemDespesas;

  aditamentos: AditamentoDTO[] = [];
  aditamento: AditamentoDTO = new AditamentoDTO();

  cabecalho0 = 'MINISTÉRIO DA DEFESA';
  cabecalho1 = 'EXÉRCITO BRASILEIRO';
  cabecalho2 = 'COMPANHIA DE COMANDO DO COMANDO MILITAR DO SUL';
  cabecalho3 = '(COMPANHIA CAPITÃO EURICO CAPITULINO DE BARROS)';
  constructor(private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private despesasService: DespesasService,
              private exclusoesAuxilioTransporteService: ExclusoesAuxilioTransporteService,
              private inclusoesAuxilioTransporteService: InclusoesAuxilioTransporteService,
              private saquesAtrasadosService: SaquesAtrasadosService,
              private atualizacoesAuxilioTransporteService: AtualizacoesAuxilioTransporteService,
              private aditamentosService: AditamentosService,
              private router: Router) { }

  ngOnInit() {
    this.carregarTexto('');
    this.carregarAditamentos();
  }

  baixarPDF() {
    console.log(xepOnline);
     return xepOnline.Formatter.Format('content', {render: 'download'});
  }

  carregarAditamentos() {
    this.aditamentosService.retornarTodos().subscribe( response => { this.aditamentos = response; },
       error => {console.log(error); });
  }

  carregarInfomacaoAditamento(aditamento: AditamentoDTO) {
    this.setarNulo();
    this.carregarTexto(aditamento.despesaPeriodo);
    this.carregarDespesas(aditamento.id);
    this.carregarInclusoesAuxilioTransporte(aditamento.id);
    this.carregarAtualizacoesAuxilioTransporte(aditamento.id);
    this.carregarExclusoesAuxilioTransporte(aditamento.id);
    this.carregarPagamentosAtrasados(aditamento.id);
  }

  setarNulo() {
    this.despesas = [];
    this.despesasSomadas = [];
    this.inclusoesAuxilioTransporte = [];
    this.atualizacoesAuxilioTransporte = [];
    this.exclusoesAuxilioTransporte = [];
    this.saquesAtrasados = [];
  }
// DESPESA A ANULAR

// so continua a separacao
  carregarDespesas(aditamentoId: number) {
    this.despesasService.retornarDespesasPorAditamentoId(aditamentoId).subscribe(response => {
      this.despesasSomadas = response;
       if (this.despesasSomadas.length > 0) { 
         this.somarDespesas(this.despesasSomadas);
       }
      } ,
      error =>  {console.log(error); } );
  }

  // somar os valores das despesas que o militar tem cadastrado no aditamento selecionado
  // OBS: inverter a logica de despesas e despesasSomadas
  somarDespesas(despesas: DespesaDTO[]) {
      let index = 1;
       this.despesas[0] = despesas[0];
        // somando as despesas e quantidade de dias
          for (let i = 1; i < despesas.length; i++) {
            let contador = 0;
              for (let k = 0; k < this.despesas.length; k++) {
              if (this.despesas[k].militarPrecCP === despesas[i].militarPrecCP) {
                        this.despesas[k].valor += despesas[i].valor;
                        this.despesas[k].quantidadeDias += despesas[i].quantidadeDias;
                          contador = 1;
                    }
              }
                if (contador === 0) {
                  this.despesas[index] = despesas[i];
                  index++;
                }
          }
          /*
          // atribuindo valor R$ 0, caso a soma das despesas resulte em valores negativos.
            for (let i = 0; i < this.despesas.length; i++) {
                if (this.despesa[i].valor < 0) {
                  this.despesa[i].valor = 0;
                }
            }
            */
              this.dataSourceDespesas = this.despesas;
         // console.log(this.despesas);
    this.carregarMilitaresDespesas(this.dataSourceDespesas);
    this.carregarMilitares(this.despesas);
  }


  carregarMilitares(despesas: DespesaDTO[]) {
    this.militaresService.retornarTodos().subscribe( response => { this.militares = response;
    this.separarMilitaresSemDespesas(despesas, this.militares); } , error => { console.log(error); } );

  }

// compara todos os militares com as despesas do aditamento selecionado para saber quais militares nao tiveram despesas
  separarMilitaresSemDespesas(despesas: DespesaDTO[], militares: MilitarDTO[]) {
    for ( let  i = 0; i < militares.length; i++) {
      let contador = 0;
        for ( let  k = 0; k < despesas.length; k++) {
          if ( militares[i].precCP !== this.despesas[k].militarPrecCP ) {
              contador++;
            //  console.log('valor do contador e: ' + contador);
          }
          if (contador === despesas.length) {
            this.despesa.militarPrecCP = militares[i].precCP;
              this.militaresSemDespesas.push(this.despesa);
            this.despesa = new DespesaDTO;
          }
        }
    }
    this.dataSourceMilitaresSemDespesas = this.militaresSemDespesas;
    this.carregarMilitaresDespesas(this.dataSourceMilitaresSemDespesas);
  }

  carregarMilitaresDespesas(despesas: DespesaDTO[]) {
    for (let i = 0; i < despesas.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(despesas[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; despesas[i].nome = this.militares[i].nome;
                      this.atribuirGraduacoesDespesa(despesas[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  atribuirGraduacoesDespesa(despesa: DespesaDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; despesa.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  // INCLUSOES AUXILIO TRANSPORTE
  carregarInclusoesAuxilioTransporte(id: number) {
    this.inclusoesAuxilioTransporteService.retornarInclusoesPorAditamentoId(id).subscribe(
      response => {this.inclusoesAuxilioTransporte = response;
      console.log(this.inclusoesAuxilioTransporte); this.atribuirMilitaresInclusoes(this.inclusoesAuxilioTransporte); } ,
        error => {console.log(error); } );
  }

  atribuirMilitaresInclusoes(inclusoes: InclusaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < inclusoes.length; i++) {
      this.militaresService.retornarMilitarPorPrecCP(inclusoes[i].militarPrecCP).subscribe(
        response => {this.militares[i] = response; inclusoes[i].nome = this.militares[i].nome;
                    this.atribuirGraduacoesInclusao(inclusoes[i], this.militares[i]); },
        error => {console.log(error); }
      );
    }
  }

  atribuirGraduacoesInclusao(inclusao: InclusaoAuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; inclusao.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

  // AUMENTO DE PASSAGEM
  carregarAtualizacoesAuxilioTransporte(id: number) {
    this.atualizacoesAuxilioTransporteService.retornarAtualizacoesPorAditamentoId(id).subscribe(response => {
      this.atualizacoesAuxilioTransporte = response; console.log(this.atualizacoesAuxilioTransporte);
      this.atribuirMilitaresAtualizacoes(this.atualizacoesAuxilioTransporte); } , error => {console.log(error); } );
  }

  atribuirMilitaresAtualizacoes(atualizacoes: AtualizacaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < atualizacoes.length; i++) {
      this.militaresService.retornarMilitarPorPrecCP(atualizacoes[i].militarPrecCP).subscribe(
        response => {this.militares[i] = response; atualizacoes[i].nome = this.militares[i].nome;
                    this.atribuirGraduacoesAtualizacao(atualizacoes[i], this.militares[i]); },
        error => {console.log(error); }
      );
    }
  }

  atribuirGraduacoesAtualizacao(atualizacao: AtualizacaoAuxilioTransporteDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; atualizacao.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

  // EXCLUSOES AUXILIO TRANSPORTE
  carregarExclusoesAuxilioTransporte(id: number) {
    this.exclusoesAuxilioTransporteService.retornarExclusoesPorAditamentoId(id).subscribe(
      response => {this.exclusoesAuxilioTransporte = response;
      console.log(this.exclusoesAuxilioTransporte); this.atribuirMilitaresExclusao(this.exclusoesAuxilioTransporte); } ,
        error => {console.log(error); } );
  }

  atribuirMilitaresExclusao(exclusoes: ExclusaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < exclusoes.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(exclusoes[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; exclusoes[i].nome = this.militares[i].nome;
                      this.atribuirGraduacoesExclusao(exclusoes[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
  }

  atribuirGraduacoesExclusao(exclusao: ExclusaoAuxilioTransporteDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; exclusao.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

// SAQUES ATRASADOS
  carregarPagamentosAtrasados(id: number) {
      this.saquesAtrasadosService.retornarPagamentosAtrasadosPorAditamentoId(id).subscribe(response => {this.saquesAtrasados = response;
      console.log(this.saquesAtrasados); this.atribuirMilitaresPagamentoAtrasado(this.saquesAtrasados); } ,
        error => {console.log(error); } );
  }

  atribuirMilitaresPagamentoAtrasado(pagamentos: SaqueAtrasadoDTO[]) {
      for (let i = 0; i < pagamentos.length; i++) {
        this.militaresService.retornarMilitarPorPrecCP(pagamentos[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; pagamentos[i].nome = this.militares[i].nome;
                      this.atribuirGraduacoesPagamentoAtrasado(pagamentos[i], this.militares[i]); },
          error => {console.log(error); }
        );
      }
  }

  atribuirGraduacoesPagamentoAtrasado(pagamento: SaqueAtrasadoDTO, militar: MilitarDTO) {
    this.postosGraduacoesService.retornarPostoGraduacaoPorId(militar.postoGraduacaoId).subscribe(
      response => {this.postoGraduacao = response; pagamento.graduacao = this.postoGraduacao.nome; },
         error => {console.log(error); } );
  }

  carregarTexto(despesaPeriodo: String) {
    this.aditamento.despesaTexto = 'Seja realizada a Despesa a Anular (DA) do benefício ' +
                                    'de Auxílio Transporte (AT), dos militares abaixo, ' + despesaPeriodo +
                                    ', de acordo com o Decreto nº 2.963, de 24 fev 1999,' +
                                    ' as IG 70-04 (Port. nº 334, de 25 jun 1999), as IR 70-21 (Port. nº 114, de 30 jun 1999), ' +
                                    'a Port. nº 98 – DGP, de 31 out 01, a Prt. nº 269 – DGP, de 11 dez 07 e a Port. nº 849 – Cmt ' +
                                    'Ex, de 14 jul 16 (EB 10-IG-02.018).';

    this.aditamento.inclusaoTexto = 'Seja realizada a Inclusão do benefício de Auxílio Transporte (AT), ' +
                                    'de acordo com o Decreto nº 2.963, de 24 fev 1999, as IG 70-04 (Port. nº 334, ' +
                                    ' de 25 jun 1999), as IR 70-21 (Port. nº 114, de 30 jun 1999), a Port. nº 98 – DGP, ' +
                                    'de 31 out 01, a Prt. nº 269 – DGP, de 11 dez 07 e a Port. nº 849 – Cmt Ex, de 14 jul 16 ' +
                                    '(EB 10-IG-02.018). ';

    this.aditamento.atualizacaoTexto =  'Seja atualizado o valor do benefício do Auxílio-Transporte (AT) referente ' +
                                        'ao deslocamento de 22 (vinte e dois) dias, de acordo com o Decreto nº 2.963, ' +
                                        'de 24 fev 1999, as IG 70-04 (Port. nº 334, de 25 jun 1999), as IR 70-21 (Port. nº 14, ' +
                                        'de 30 jun 1999), a Port. nº 98 - DGP, de 31 out 01, a Port. nº 269 - DGP, de 11 dez 07 ' +
                                        'e a Port. nº 849 - Cmt Ex, de 14 jul 16 (EB 10-IG-02.018).' ;

    this.aditamento.exclusaoTexto = 'Seja cancelado o benefício do AT de acordo com o Art. 11. das Instruções Reguladoras ' +
    'para a Concessão do Auxílio-Transporte no Exército Brasileiro (IR 70-21).';


    this.aditamento.pagamentoAtrasadoTexto =  'Seja realizado o saque atrasado do benefício de Auxlio-Transporte (AT), ' +
                                              'de acordo com o Decreto nº 2.963, de 24 fev 1999, as IG 70-04 (Port. nº 334, ' +
                                              'de 25 jun 1999), as IR 70-21 (Port. nº 14, de 30 jun 1999), a Port. nº 98 - DGP, ' +
                                              'de 31 out 01, a Port. nº 269 - DGP, de 11 dez 07 e a Port. nº 849 - Cmt Ex, de 14 ' +
                                              'jul 16 (EB 10-IG-02.018).';
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
  
  /*
  // tslint:disable-next-line:member-ordering
  @ViewChild('content') content: ElementRef;

  public downloadPDF() {
      // tslint:disable-next-line:prefer-const
      let doc = new jsPDF();

      // tslint:disable-next-line:prefer-const
      let specialElementHandlers = {
          '#editor': function(element, renderer) {
              return true;
          }
      };
      // tslint:disable-next-line:prefer-const
      let content = this.content.nativeElement;
      // doc.text(this.despesas[0].graduacao, 10, 10);

      doc.fromHTML(content.innerHTML, 30, 30, {
          'width': 100 ,
          'elementHandlers': specialElementHandlers
      });

      doc.save('test.pdf');
  }
*/
}
