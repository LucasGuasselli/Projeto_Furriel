import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Conducao } from '../../conducao';
import { AtualizacaoAuxilioTransporte } from '../../atualizacao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { AuxilioTransporte } from '../../auxilio-transporte';


@Component({
  selector: 'app-form-atualizacao-auxilio-transporte',
  templateUrl: './form-atualizacao-auxilio-transporte.component.html',
  styleUrls: ['./form-atualizacao-auxilio-transporte.component.css']
})
export class FormAtualizacaoAuxilioTransporteComponent implements OnInit {

  conducoes: Conducao[] = [
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {codConducao: null, precCP: null, itinerario: null, codAT: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null}
  ];

  conducoesAtualizacao: Conducao[] = [];
  valoresAntigos: Number[] = [];
  atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporte = new AtualizacaoAuxilioTransporte();
  aditamentoAtual: Aditamento = null;
  auxilioTransporte: AuxilioTransporte = null;
  precCP: number;
  codAT: number;

  constructor(private servicoCrudAuxilioTransporte: CrudAuxilioTransporteService, private router: Router, private rota: ActivatedRoute,
              private servicoCrudAditamento: CrudAditamentosService) { }

  ngOnInit() {
    this.codAT = this.rota.snapshot.params['cod'];

    this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

    this.precCP = this.servicoCrudAuxilioTransporte.getPrecCPPorCodAuxilioTransporte(this.codAT);

    this.conducoesAtualizacao = this.servicoCrudAuxilioTransporte.getConducoesPorCod(this.codAT);

    this.atribuiValoresAntigosParaValidacao();
    this.recebeValoresAuxilioTransporteAtualizado();
  }

  atribuiValoresAntigosParaValidacao() {
      for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
          this.valoresAntigos[i] = this.conducoesAtualizacao[i].valor;
      }
  }

  recebeValoresAuxilioTransporteAtualizado() {
    for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
        this.conducoes[i] = this.conducoesAtualizacao[i];
    }
  }

  // este metodo e responsavel por nao permitir colocar valores menores que os existentes
  verificaValores() {
    let validacao = true;
    console.log(this.atualizacaoAuxilioTransporte.motivo);

      if (this.valoresAntigos[0] > this.conducoes[0].valor) {
          alert('Voce nao pode inserir um valor menor que o anterior.\n Verifique os valores inseridos!');
          validacao = false;
      }

      // tslint:disable-next-line:triple-equals
      if (validacao == true) {
        this.atualizarConducoes();
      }
  }

  atualizarConducoes() {
    for (let  i = 0; i < this.conducoes.length; i++) {
        if (this.conducoes[i].codConducao != null ) {
          console.log(this.conducoes[i]);
          this.servicoCrudAuxilioTransporte.atualizarConducao(this.conducoes[i]);
        }
    }

    this.salvaAtualizacaoAuxilioTransporte();

    this.router.navigate(['/listaATConducao']);
  }

  salvaAtualizacaoAuxilioTransporte() {
    this.atualizacaoAuxilioTransporte.precCP = this.precCP;
    this.atualizacaoAuxilioTransporte.codAditamento = this.aditamentoAtual.codAditamento;

    this.auxilioTransporte = this.servicoCrudAuxilioTransporte.getAuxilioTransportePorPrecCP(this.precCP);
    this.atualizacaoAuxilioTransporte.valor = this.auxilioTransporte.valorTotalAT;

    this.servicoCrudAuxilioTransporte.adicionarAtualizacaoAuxilioTransporte(this.atualizacaoAuxilioTransporte);

  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}// fecha classe
