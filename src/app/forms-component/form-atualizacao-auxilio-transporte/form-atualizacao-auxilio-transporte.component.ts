import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { ConducaoDTO } from '../../models/conducao.dto';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { ConducoesService } from '../../services/conducoes.service';
import { AtualizacaoAuxilioTransporteDTO } from '../../models/atualizacaoAuxilioTransporte.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { AtualizacoesAuxilioTransporteService } from '../../services/atualizacoesAuxilioTransporte.service';


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
              private auxiliosTransporteService: AuxiliosTransporteService,
              private atualizacoesAuxilioTransporteService: AtualizacoesAuxilioTransporteService,
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
// carregando do banco todas conducoes usando um @param id de um auxilioTransporte
  loadConducoesById(id: number) {
      this.conducoesService.findConducoesByAuxilioTransporteId(id).subscribe( response => {
        this.conducoesAtualizacao = response; this.loadOldValues(); },
        error => { console.log(error); });
  }

// carregando valores antigos das conducoes para comparacoes
  loadOldValues() {
      for (let i = 0; i < this.conducoesAtualizacao.length; i++) {
          this.valoresAntigos[i] = this.conducoesAtualizacao[i].valor;
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
    this.auxiliosTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
      response => { this.auxilioTransporte = response; }
    );
    this.atualizacaoAuxilioTransporte.militarPrecCP = this.precCP;
    this.atualizacaoAuxilioTransporte.aditamentoId = this.aditamentoAtual.codAditamento;
    this.atualizacaoAuxilioTransporte.valor = this.auxilioTransporte.valorTotalAT;

    this.atualizacoesAuxilioTransporteService.insert(this.atualizacaoAuxilioTransporte).subscribe(
      response => {console.log(response); } , error => {console.log(error); }
    );
  }

  cancel() {
    this.router.navigate(['/listaATConducao']);
  }
}// fecha classe
