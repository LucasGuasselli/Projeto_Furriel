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

  constructor(private conducoesService: ConducoesService,
              private auxiliosTransporteService: AuxiliosTransporteService,
              private atualizacoesAuxilioTransporteService: AtualizacoesAuxilioTransporteService,
              private aditamentosService: AditamentosService,
              private utilService: UtilService,
              private router: Router, private rota: ActivatedRoute
              ) { }

  ngOnInit() {
    this.codAT = this.rota.snapshot.params['cod'];
    this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
    if ( this.aditamentoAtual == null)    {
      alert('Selecione um aditamento!');
      this.router.navigate(['/index']);
    }
    this.loadConducoesById(this.codAT);
  }

// carregando do banco todas conducoes usando um @param id de um auxilioTransporte
  loadConducoesById(id: number) {
      this.conducoesService.findConducoesByAuxilioTransporteId(id).subscribe( response => {
        this.conducoesAtualizacao = response; this.loadOldValues(this.conducoesAtualizacao); },
        error => { console.log(error); });
  }

// carregando valores antigos das conducoes para comparacoes
  loadOldValues(conducoesAtualizacao: ConducaoDTO[]) {
      for (let i = 0; i < conducoesAtualizacao.length; i++) {
          this.valoresAntigos[i] = conducoesAtualizacao[i].valor;
          this.conducoes[i] = conducoesAtualizacao[i];
      }
  }

  // este metodo e responsavel por nao permitir colocar valores menores que os existentes
  verifyValues() {
    let validacao = true;
    if (this.aditamentoAtual == null) {
      alert('Você precisa selecionar um aditamento!');
    } else {
      for (let i = 0; i < this.valoresAntigos.length; i++) {
        if (this.valoresAntigos[i] > this.conducoes[i].valor) {
          alert('Você não pode inserir um valor menor que o anterior.\n Verifique os valores inseridos!');
          validacao = false;
        }
      }

      if (validacao === true && this.atualizacaoAuxilioTransporte.dataInicio != null) {
        this.findAuxilioTransporteById(this.codAT);
      } else {
        alert ('Você deve selecionar uma data inicial!');
      }
    }
  }

  // buscando um auxilioTransporte
  findAuxilioTransporteById(id: number) {
    this.auxiliosTransporteService.findAuxilioTransporteById(id).subscribe(
        response => { this.auxilioTransporte = response;
        this.insertAtualizacaoAuxilioTransporte(this.auxilioTransporte);
        } , error => { console.log(error); }
    );
  }

  insertAtualizacaoAuxilioTransporte(auxilio: AuxilioTransporteDTO) {
    this.atualizacaoAuxilioTransporte.militarPrecCP = auxilio.militarPrecCP;
    this.atualizacaoAuxilioTransporte.aditamentoId = this.aditamentoAtual.id;
    this.atualizacaoAuxilioTransporte.dataInicio = this.utilService.formatDate(
                                  this.atualizacaoAuxilioTransporte.dataInicio.toString());
    this.atualizacaoAuxilioTransporte.valor = 0;

  this.atualizacoesAuxilioTransporteService.insert(this.atualizacaoAuxilioTransporte).subscribe(
    response => { if (response.status === 201 ) { this.updateConducoes(); } },
     error => {console.log(error); }
  );
}

  updateConducoes() {
    for (let  i = 0; i < this.conducoes.length; i++) {
      // so serao alteradas conducoes que nao sao nulas e tiveram aumento no valor
        if (this.conducoes[i].id != null && this.valoresAntigos[i] < this.conducoes[i].valor) {
          this.conducoesService.update(this.conducoes[i], this.conducoes[i].id).subscribe(
            response => { console.log(response); } ,
            error => {console.log(error); }
          );
        }
    }
    this.router.navigate(['/listaATConducao']);
  }

  cancel() {
    this.router.navigate(['/listaATConducao']);
  }
}// fecha classe
