import { Component, OnInit } from '@angular/core';
import { AuxilioTransporte } from '../../auxilio-transporte';
import { MilitaresService } from '../../services/militares.service';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { Aditamento } from '../../aditamento';

@Component({
  selector: 'app-form-descontos',
  templateUrl: './form-descontos.component.html',
  styleUrls: ['./form-descontos.component.css']
})
export class FormDescontosComponent implements OnInit {

   // desconto = new Desconto();
    AT: AuxilioTransporte = new AuxilioTransporte();
    auxilioTransporte: AuxilioTransporte[] = [];
   // militares: Militar[] = [];
   // militar: Militar;
    graduacao: String;
    aditamentoAtual: Aditamento = null;

    precCP: number;
    codAT: number;

  constructor(private militaresService: MilitaresService, private servicoCrudAT: CrudAuxilioTransporteService,
              private servicoCrudAditamento: CrudAditamentosService, private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
      this.auxilioTransporte = this.servicoCrudAT.getAT();
     // this.militares = this.militaresService.getMilitares();
      this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

      if (isNaN(this.precCP)) {
        // CADASTRAR
     //   this.desconto  = new Desconto();
      } else {
        // EDITAR
        // this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
        // this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));
      }
  }

  salvarDesconto() {
    if (isNaN(this.precCP)) {
      alert('Voce precisa selecionar um militar.');
    } else {
        if (this.aditamentoAtual == null) {
          alert('Voce precisa selecionar um aditamento!');
        } else {
        //    this.desconto.precCP = this.precCP;
        //    this.desconto.codAditamento = this.aditamentoAtual.codAditamento;
        //    this.desconto.nome = this.militar.nome;
        //    this.desconto.graduacao = this.graduacao;

            // salvando
        //    this.servicoCrudAT.adicionarDesconto(this.desconto);
        //    this.desconto = new Desconto();
        }
    }
  }

  salvarPrecCPMilitar(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
      //  this.militar = this.militaresService.getMilitarPorPrecCP(this.precCP);
      //  this.graduacao = this.militaresService.getPostoGraduacaoPorCodigo(this.militar.codPostoGraduacao).nome;
        // console.log(this.precCP);
    }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
