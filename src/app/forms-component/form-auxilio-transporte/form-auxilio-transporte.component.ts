import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Militar } from '../../militar';
import { AuxilioTransporte } from '../../auxilio-transporte';
import { Conducao } from '../../conducao';
import { PostoGraduacao } from '../../posto-graduacao';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { InclusaoAuxilioTransporte } from '../../inclusao-auxilio-transporte';

@Component({
  selector: 'app-form-auxilio-transporte',
  templateUrl: './form-auxilio-transporte.component.html',
  styleUrls: ['./form-auxilio-transporte.component.css']
})
export class FormAuxilioTransporteComponent implements OnInit {

    titulo = 'Cadastro de AuxilioTransporte';

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

    AT: AuxilioTransporte = new AuxilioTransporte();
    auxiliosTransporte: AuxilioTransporte[] = [];
    postoGraduacao: PostoGraduacao[] = [];
    militaresSemAuxilioTransporte: Militar[] = [];
    aditamentoAtual: Aditamento;
    inclusaoAuxilioTransporte: InclusaoAuxilioTransporte = new InclusaoAuxilioTransporte();

    precCP: number;
    // codAT: number;
    codConducao: number;

    constructor(private servicoCrudMilitares: MilitaresService, private servicoCrudAT: CrudAuxilioTransporteService,
              private router: Router, private rota: ActivatedRoute, private servicoCrudAditamento: CrudAditamentosService) { }

   ngOnInit() {
        this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

    // codConducao recebe o codigo da conducao que o usuario quer editar
        this.codConducao = this.rota.snapshot.params['cod'];

        this.auxiliosTransporte = this.servicoCrudAT.getAT();
        this.militaresSemAuxilioTransporte = this.servicoCrudAT.getMilitaresSemAuxilioTransporte();
        this.postoGraduacao = this.servicoCrudMilitares.getPostoGraduacao();

    if (isNaN(this.codConducao)) {
        // CADASTRAR
        // this.conducao  = new Conducao();
    } else {
        // EDITAR
        //  this.conducao = Object.assign({}, this.servicoCrudAT.getConducaoPorCodigo(this.codConducao));
        }
    }

salvarAuxilioTransporte() {
   if (isNaN(this.precCP)) {
        alert('selecione um militar!');
   } else {
        this.salvarAT(this.precCP);
           this.auxiliosTransporte = this.servicoCrudAT.getAT();

            for ( let i = 0; i < this.auxiliosTransporte.length; i++) {
            // tslint:disable-next-line:triple-equals
                if ( this.auxiliosTransporte[i].precCP == this.precCP) {
                    for (let k = 0; k < this.conducoes.length; k++) {
                        if (this.conducoes[k].valor != null && this.conducoes[k].tipoDeTransporte != null
                            && this.conducoes[k].nomeEmpresa != null && this.conducoes[k].itinerario != null) {
                            this.salvarConducao(this.conducoes[k], this.auxiliosTransporte[i].precCP, this.auxiliosTransporte[i].codAT);
                        }
                    }
                }
            }
            this.militaresSemAuxilioTransporte = this.servicoCrudAT.getMilitaresSemAuxilioTransporte();
           // console.log(this.inclusaoAuxilioTransporte.dataInicio);
            this.salvarInclusaoAuxilioTransporte(this.inclusaoAuxilioTransporte);
   }
}
// FALTA ADICIONAR O VALOR E A DATA INICIAL DA CONCESSAO DO AUXILIO (A DATA PODE SER COLOCADA NO HTML MESMO)
salvarInclusaoAuxilioTransporte(inclusaoAuxilioTransporte: InclusaoAuxilioTransporte) {
    inclusaoAuxilioTransporte.codAditamento = this.aditamentoAtual.codAditamento;

    inclusaoAuxilioTransporte.precCP = this.precCP;

    inclusaoAuxilioTransporte.valor = this.servicoCrudAT.getAuxilioTransportePorPrecCP(this.precCP).valorTotalAT;
    this.servicoCrudAT.adiocionarInclusaoAuxilioTransporte(inclusaoAuxilioTransporte);
    console.log(inclusaoAuxilioTransporte.valor);
}

salvarPrecCPMilitar(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
    }
}

salvarAT(codigo: number) {
    this.AT.precCP = codigo;
    this.AT.valorDiarioAT = 0;
    this.AT.valorTotalAT = 0;

    this.servicoCrudAT.adiocionarAT(this.AT);
    this.AT = new AuxilioTransporte();
}

salvarConducao(conducao: Conducao, precCP: number, codAT: number) {
    conducao.precCP = precCP;
    conducao.codAT = codAT;

    this.servicoCrudAT.adiocionarConducao(conducao);
}

informarCadastro() {
    alert('Cadastro efetuado com sucesso!');
}

cancelar() {
    this.router.navigate(['/index']);
  }
}



/*
// caso o militar nao tenha um Aux Transporte ele sera criado
verificaAT() {
    if (isNaN(this.precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        // SE O MILITAR JA TEM AUX TRANSPORTE SO E CADASTRADO UMA CONDUCAO A MAIS
        for ( let i = 0; i < this.auxilioTransporte.length; i++) {
              // tslint:disable-next-line:triple-equals
              if ( this.auxilioTransporte[i].precCP == this.precCP) {
                    // this.salvarConducao(this.auxilioTransporte[i].precCP, this.auxilioTransporte[i].codAT);
                // verifica passa a ser verdadeiro para cadastrar somente uma conducao
                    this.verifica = true;
                    // console.log("ja tem aux transporte");
              }
        }
    }// fecha if-else
    // caso nao tenha Aux Transporte
    if (this.verifica === false) {
                this.salvarAT(this.precCP);
                this.auxilioTransporte = this.servicoCrudAT.getAT();
            // verificacao passa a ser verdadeira para nao virar um looping
                this.verifica = true;
            // o metodo e chamado de forma recursiva
                this.verificaAT();
    }
    this.verifica = false;
    this.auxilioTransporte = this.servicoCrudAT.getAT();
    this.informarCadastro();
}// fecha metodo


salvarConducaoSemPublicacao(precCP: number, codAT: number) {
   // this.conducao.precCP = precCP;
   // this.conducao.codAT = codAT;

   // this.servicoCrudAT.adiocionarConducao(this.conducao);
}
*/
