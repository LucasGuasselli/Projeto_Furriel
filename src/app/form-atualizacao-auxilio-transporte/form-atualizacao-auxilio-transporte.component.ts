import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Conducao } from '../conducao';
import { AtualizacaoAuxilioTransporte } from '../atualizacao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { Aditamento } from '../aditamento';
import { CrudAditamentosService } from '../crud-aditamentos.service';


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
  atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporte = new AtualizacaoAuxilioTransporte();
  aditamentoAtual: Aditamento = null;
  codAT: number;

  constructor(private servicoCrudAuxilioTransporte: CrudAuxilioTransporteService, private router: Router, private rota: ActivatedRoute,
              private servicoCrudAditamento: CrudAditamentosService) { }

  ngOnInit() {

    this.codAT = this.rota.snapshot.params['cod'];
    this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

    this.conducoesAtualizacao = this.servicoCrudAuxilioTransporte.getConducoesPorCod(this.codAT);

    this.recebeValoresAuxilioTransporteAtualizado();
  }

  recebeValoresAuxilioTransporteAtualizado() {
    for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
        this.conducoes[i] = this.conducoesAtualizacao[i];
    }
  }

  // este metodo e responsavel por nao permitir colocar valores menores que os existentes
  verificaValores() {

  }

  atualizarConducoes() {
    for (let  i = 0; i < this.conducoes.length; i++) {
        if (this.conducoes[0].codConducao != null ) {
          this.servicoCrudAuxilioTransporte.atualizarConducao(this.conducoes[0]);
        }
    }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}// fecha classe
