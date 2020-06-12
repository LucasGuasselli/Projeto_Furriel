import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConducaoDTO } from '../../models/conducao.dto';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ConducoesService } from '../../services/conducoes.service';
import { AtualizacaoAuxilioTransporteDTO } from '../../models/atualizacaoAuxilioTransporte.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { AtualizacoesAuxilioTransporteService } from '../../services/atualizacoesAuxilioTransporte.service';
import { UtilService } from '../../services/util.service';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { PassagemDTO } from "../../models/Passagem.dto";
import { PassagensService } from "../../services/passagens.service";
import { SaqueAtrasadoDTO } from "../../models/saqueAtrasado.dto";
import { SaquesAtrasadosService } from "../../services/saquesAtrasados.service";
import { DespesaDTO } from "../../models/despesa.dto";
import { DespesasService } from "../../services/despesas.service";


@Component({
  selector: 'app-form-atualizacao-auxilio-transporte',
  templateUrl: './form-atualizacao-auxilio-transporte.component.html',
  styleUrls: ['./form-atualizacao-auxilio-transporte.component.css']
})
export class FormAtualizacaoAuxilioTransporteComponent implements OnInit {

  conducoes: ConducaoDTO[] = [
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    ];

  conducoesAtualizacao: ConducaoDTO[] = [];
  valoresAntigos: Number[] = [];
  aditamentoAtual: AditamentoDTO = null;
  auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO();
  precCP: number;
  codAT: number;
  atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporteDTO = new AtualizacaoAuxilioTransporteDTO();
  passagens: PassagemDTO[] = [];
  saqueAtrasado: SaqueAtrasadoDTO = new SaqueAtrasadoDTO();
  data: Date = new Date();
  despesa: DespesaDTO = new DespesaDTO();

  constructor(private conducoesService: ConducoesService,
              private auxiliosTransporteService: AuxiliosTransporteService,
              private atualizacoesAuxilioTransporteService: AtualizacoesAuxilioTransporteService,
              private aditamentosService: AditamentosService,
              private passagensService: PassagensService,
              private saquesAtrasadosService: SaquesAtrasadosService,
              private despesasService: DespesasService,
              private utilService: UtilService,
              private router: Router, private rota: ActivatedRoute
              ) { }

  ngOnInit() {
    this.codAT = this.rota.snapshot.params['cod'];
      this.aditamentoAtual = this.aditamentosService.retornarAditamentoAtual();
        if ( this.aditamentoAtual == null)    {
          alert('Selecione um aditamento!');
          this.router.navigate(['/index']);
        }
          this.carregarPassagens();
          this.carregarConducoesPorId(this.codAT);
          this.encontrarAuxilioTransportePorId(this.codAT);
  }

  carregarPassagens() {
      this.passagensService.retornarTodos().subscribe( response => { this.passagens = response; },
        error => { console.log(error); } );
  }

// carregando do banco todas conducoes usando um @param id de um auxilioTransporte
  carregarConducoesPorId(id: number) {
      this.conducoesService.retornarConducoesPorAuxilioTransporteId(id).subscribe( response => {
        this.conducoesAtualizacao = response; this.carregarValoresAntigos(this.conducoesAtualizacao); 
      },
        error => { console.log(error); }
      );
  }

  // carregando valores antigos das conducoes para comparacoes
  carregarValoresAntigos(conducoesAtualizacao: ConducaoDTO[]) {
      for (let i = 0; i < conducoesAtualizacao.length; i++) {
            this.valoresAntigos[i] = conducoesAtualizacao[i].valor;
            this.conducoes[i] = conducoesAtualizacao[i];
      }
  }

  // buscando um auxilioTransporte
  encontrarAuxilioTransportePorId(id: number) {
    this.auxiliosTransporteService.retornarAuxilioTransportePorId(id).subscribe(
        response => { 
          this.auxilioTransporte = response;
        }, 
        error => { console.log(error); }
    );
  }

  // este metodo e responsavel direcionar a regra de negocio conforme aumento ou queda do valor total do auxílio
  verificarValores() {
    // variaveis locais usadas no auxilio das decisões e calculos de valores
      let valoresAntigos = null;
      let valoresConducoes = null;
      let diferenca = null;

    if (this.data != null) {
      if (this.atualizacaoAuxilioTransporte.motivo != null) {
          for (let i = 0; i < this.valoresAntigos.length; i++) {
                    valoresAntigos += this.valoresAntigos[i];               
          }
          for (let i = 0; i < this.conducoes.length; i++) {
                valoresConducoes += this.conducoes[i].valor;
          }
            if (valoresConducoes > valoresAntigos) {
                // cadastrar saque atrasado
                  diferenca = valoresConducoes - valoresAntigos;
                    this.prepararSaqueAtrasado(this.auxilioTransporte, diferenca);
                    this.prepararAtualizacaoAuxilioTransporte(this.auxilioTransporte);
            } else if (valoresConducoes < valoresAntigos) {
                // cadastrar desconto
                  diferenca = valoresAntigos - valoresConducoes;
                   console.log('diferenca: ' + diferenca);
                    this.prepararDespesa(this.auxilioTransporte, diferenca);
                    this.prepararAtualizacaoAuxilioTransporte(this.auxilioTransporte);
            } else {
                 // valores iguais só altera texto
            }
      } else{
                  alert('Você deve inserir um motivo!');

      }      
    } else {
          alert('Você deve selecionar uma data inicial!');
    }      
            // alert('Você não pode inserir um valor menor que o anterior.\n Verifique os valores inseridos!');
  }

  prepararAtualizacaoAuxilioTransporte(auxilio: AuxilioTransporteDTO) {
      this.atualizacaoAuxilioTransporte.militarPrecCP = auxilio.militarPrecCP;
      this.atualizacaoAuxilioTransporte.aditamentoId = this.aditamentoAtual.id;
      this.atualizacaoAuxilioTransporte.dataInicio = this.utilService.formatarData(this.data.toString());
      this.atualizacaoAuxilioTransporte.valor = auxilio.valorTotalAT;
        this.inserirAtualizacaoAuxilioTransporte(this.atualizacaoAuxilioTransporte);
  }

// inserindo uma atualizacao de auxilio transporte
  inserirAtualizacaoAuxilioTransporte(atualizacaoAuxilio: AtualizacaoAuxilioTransporteDTO) {
    this.atualizacoesAuxilioTransporteService.inserir(atualizacaoAuxilio).subscribe(
      response => { 
        if (response.status === 201 ) { console.log(atualizacaoAuxilio); this.atualizarConducoes(); } 
      },
        error => { console.log(error); }
    );
  }

  atualizarConducoes() {
    // se alguma conducao der erro ao atualizar 
    let valida = true;
    for (let  i = 0; i < this.conducoes.length; i++) {
      // conducoes que sofreram alteracoes (sao validadas por possuir um ID e terem valor diferente do anterior)
        if (this.conducoes[i].id != null && this.valoresAntigos[i] != this.conducoes[i].valor) {
           this.conducoesService.editar(this.conducoes[i], this.conducoes[i].id).subscribe(
              response => { if (response.status != 204) {
                              valida = false;                            
                            } 
              },
                error => {console.log(error); }
           );
        }
      // adicionando conducoes novas 
        if(this.conducoes[i].id == null && this.conducoes[i].itinerario != null && this.conducoes[i].nomeEmpresa != null && this.conducoes[i].tipoDeTransporte != null && this.conducoes[i].valor > 0) {
            this.conducoes[i].auxilioTransporteId = this.auxilioTransporte.id;
                this.conducoesService.inserirNovaConducao(this.conducoes[i]).subscribe(
                  response => {  if (response.status != 201){
                                  valida = false;
                                }
                  },
                    error => { console.log(error); }
                );
        }
      // quando uma(s) conducao(oes) é(são) deletada(s) com a atribuicao do valor 0 (ZERO)
        if (this.conducoes[i].id != null && this.conducoes[i].valor == 0) {
          console.log('deletando conducao');
            this.conducoesService.deletar(this.conducoes[i]).subscribe(
                response => { if (response.status != 204) { 
                                valida = false;
                              } 
                },
                error => { console.log(error); }
            );
        }
  }
    if (valida == true) {
        alert('Atualização de Auxilio cadastrada com sucesso!');
    }else {
        alert('Não foi possivel atualizar corretamente o Auxílio Transporte');
    }
    // this.router.navigate(['/listaATConducao']);
  }

  prepararSaqueAtrasado(auxilioTransporte: AuxilioTransporteDTO, diferenca: number) {
        this.saqueAtrasado.aditamentoId = this.aditamentoAtual.id;
        this.saqueAtrasado.militarPrecCP = this.auxilioTransporte.militarPrecCP;
        this.saqueAtrasado.motivo = 'Atualização de Auxílio Transporte';
        this.saqueAtrasado.mesReferencia = this.utilService.retornarNomeMes(this.data.toString());
        
        // a quantidade e a soma dos dias restantes do mes atual + 22 dias conforme regra de negocio
            // variavel dataFim utilizada para realizar o calculo dos dias restantes
            let dataFim: Date = new Date();
            // console.log(dataFim);
              dataFim.setDate(this.data.getDate());
             //  console.log(dataFim);
                this.saqueAtrasado.quantidadeDias = this.utilService.calcularQuantidadeDias(this.data, dataFim, 'Atualizacao Auxilio' , 0, 0);
                    this.saqueAtrasado.valor = diferenca * this.saqueAtrasado.quantidadeDias;

            this.inserirSaqueAtrasado();
    }

  // este metodo serve para cadastrar um saque atrasado referente a inclusao do Auxilio Transporte, tendo em vista que o militar só recebe pelo menos um mes e um dia apos a solicitacao
  inserirSaqueAtrasado() {
       this.saquesAtrasadosService.inserir(this.saqueAtrasado).subscribe(
           response => { if(response.status == 201) { alert( 'Cadastro de Saque Atrasado com sucesso!' ); } ; },
                error => { console.log(error); }
       );
  }
  
  prepararDespesa(auxilioTransporte: AuxilioTransporteDTO, diferenca: number) {
    this.despesa.aditamentoId = this.aditamentoAtual.id;
    this.despesa.militarPrecCP = auxilioTransporte.militarPrecCP;
    this.despesa.dataInicio = this.utilService.formatarData(this.data.toString());
    // a quantidade e a soma dos dias restantes do mes atual + 22 dias conforme regra de negocio
    // variavel dataFim utilizada para realizar o calculo dos dias restantes
      let dataFim: Date = new Date();
          dataFim.setDate(this.data.getDate());
    this.despesa.quantidadeDias = this.utilService.calcularQuantidadeDias( this.data, dataFim, 'Atualizacao Auxilio' , 0, 0);
    this.despesa.dataFim = this.utilService.formatarData(this.despesa.calculoDataFim.toString());
    // elaborar uma forma de pegar a dataFim da despesa !!!!!!!
    
    // valor
    this.despesa.valor = this.despesa.quantidadeDias * diferenca;
    // motivo
    this.despesa.motivo = 'Atualização de Auxílio Transporte';

             this.inserirDespesa();
  }

  inserirDespesa() {
      this.despesasService.inserirDespesaAtualizacaoAuxilio(this.despesa).subscribe(response => { 
          if (response.status === 201 ) { alert('Despesa Cadastrada com Sucesso!'); console.log(response); }
        },
          error => {console.log(error); });
  }

  cancelar() {
    this.router.navigate(['/listaATConducao']);
  }
  
}// fecha classe
