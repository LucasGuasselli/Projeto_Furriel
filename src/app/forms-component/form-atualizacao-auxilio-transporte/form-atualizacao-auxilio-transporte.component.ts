import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AtualizacaoAuxilioTransporte } from '../../atualizacao-auxilio-transporte';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { ConducaoDTO } from '../../models/conducao.dto';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ConducoesService } from '../../services/conducoes.service';
import { AtualizacaoAuxilioTransporteDTO } from '../../models/atualizacaoAuxilioTransporte.dto';


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
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
    ];

  conducoesAtualizacao: ConducaoDTO[] = [];
  valoresAntigos: Number[] = [];
  aditamentoAtual: Aditamento = null;
  auxilioTransporte: AuxilioTransporteDTO = null;
  precCP: number;
  codAT: number;
  atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporteDTO = new AtualizacaoAuxilioTransporteDTO();


  constructor(private conducoesService: ConducoesService,
              private servicoCrudAditamento: CrudAditamentosService,
              private router: Router, private rota: ActivatedRoute
              ) { }

  ngOnInit() {
    this.codAT = this.rota.snapshot.params['cod'];
    console.log(this.codAT);
    this.loadConducoesById(this.codAT);

    this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

      if (this.aditamentoAtual == null) {
        alert('Voce precisa selecionar um aditamento!');
      }
  }

  loadConducoesById(id: number) {
      this.conducoesService.findConducoesByAuxilioTransporteId(id).subscribe( response => {
        this.conducoesAtualizacao = response; this.loadOldValues(); },
        error => { console.log(error); });
  }

  loadOldValues() {
      for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
          this.valoresAntigos[i] = this.conducoesAtualizacao[i].valor;
      }
      this.loadConducoes();
  }

  loadConducoes() {
    for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
        this.conducoes[i] = this.conducoesAtualizacao[i];
    }
  }

  // este metodo e responsavel por nao permitir colocar valores menores que os existentes
  verifyValues() {
    let validacao = true;
    if (this.aditamentoAtual == null) {
      alert('Voce precisa selecionar um aditamento!');
    } else {
      for (let i = 0; i < this.valoresAntigos.length; i++) {
        if (this.valoresAntigos[i] > this.conducoes[i].valor) {
          alert('Voce nao pode inserir um valor menor que o anterior.\n Verifique os valores inseridos!');
          validacao = false;
        }
      }

      // tslint:disable-next-line:triple-equals
      if (validacao == true) {
        this.updateConducoes();
      }
    }
  }

  updateConducoes() {
    for (let  i = 0; i < this.conducoes.length; i++) {
        if (this.conducoes[i].id != null ) {
          console.log(this.conducoes[i]);
          this.conducoesService.update(this.conducoes[i], this.conducoes[i].id, this.valoresAntigos[i]).subscribe(
            response => { console.log(response); } , error => {console.log(error); }
          );
        }
    }

    // this.salvaAtualizacaoAuxilioTransporte();

    this.router.navigate(['/listaATConducao']);
  }

  saveAtualizacaoAuxilioTransporte() {
    this.atualizacaoAuxilioTransporte.militarPrecCP = this.precCP;
    this.atualizacaoAuxilioTransporte.aditamentoId = this.aditamentoAtual.codAditamento;

  //  this.auxilioTransporte = this.servicoCrudAuxilioTransporte.getAuxilioTransportePorPrecCP(this.precCP);
    this.atualizacaoAuxilioTransporte.valor = this.auxilioTransporte.valorTotalAT;

  //  this.servicoCrudAuxilioTransporte.adicionarAtualizacaoAuxilioTransporte(this.atualizacaoAuxilioTransporte);

  }

  cancel() {
    this.router.navigate(['/listaATConducao']);
  }
}// fecha classe
