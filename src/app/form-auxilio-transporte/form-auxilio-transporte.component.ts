import { Component, OnInit } from '@angular/core';
import { CrudMilitaresService } from '../crud-militares.service';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Militar } from '../militar';
import { AuxilioTransporte } from '../auxilio-transporte';
import { Conducao } from '../conducao';
import { PostoGraduacao } from '../posto-graduacao';

@Component({
  selector: 'app-form-auxilio-transporte',
  templateUrl: './form-auxilio-transporte.component.html',
  styleUrls: ['./form-auxilio-transporte.component.css']
})
export class FormAuxilioTransporteComponent implements OnInit {

    titulo = 'Cadastro de AuxilioTransporte';

    conducao: Conducao = new Conducao();
    AT: AuxilioTransporte = new AuxilioTransporte();
    auxilioTransporte: AuxilioTransporte[] = [];
    postoGraduacao: PostoGraduacao[] = [];

    militar: Militar[] = [];
    precCP: number;
    codAT: number;
    codConducao: number;
    verifica = false;

  constructor(private servicoCrudMilitares: CrudMilitaresService, private servicoCrudAT: CrudAuxilioTransporteService,
              private router: Router, private rota: ActivatedRoute) { }

   ngOnInit() {
    // codConducao recebe o codigo da conducao que o usuario quer editar
        this.codConducao = this.rota.snapshot.params['cod'];

        this.auxilioTransporte = this.servicoCrudAT.getAT();
        this.militar = this.servicoCrudMilitares.getMilitares();
        this.postoGraduacao = this.servicoCrudMilitares.getPostoGraduacao();

  if (isNaN(this.codConducao)) {
      // CADASTRAR
      this.conducao  = new Conducao();
  } else {
      // EDITAR
      this.conducao = Object.assign({}, this.servicoCrudAT.getConducaoPorCodigo(this.codConducao));
    }
  }

// caso o militar nao tenha um Aux Transporte ele sera criado
verificaAT() {
    if (isNaN(this.precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        // SE O MILITAR JA TEM AUX TRANSPORTE SO E CADASTRADO UMA CONDUCAO A MAIS
        for ( let i = 0; i < this.auxilioTransporte.length; i++) {
              // tslint:disable-next-line:triple-equals
              if ( this.auxilioTransporte[i].precCP == this.precCP) {
                    this.salvarConducao(this.auxilioTransporte[i].precCP, this.auxilioTransporte[i].codAT);
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

salvarPrecCPMilitar(precCP: number) {
    if (isNaN(precCP)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.precCP = precCP;
        console.log(this.precCP);
    }
}

salvarAT(codigo: number) {
    this.AT.precCP = codigo;
    this.AT.valorDiarioAT = 0;
    this.AT.valorTotalAT = 0;

    this.servicoCrudAT.adiocionarAT(this.AT);
}

salvarConducao(precCP: number, codAT: number) {
    this.conducao.precCP = precCP;
    this.conducao.codAT = codAT;

    this.servicoCrudAT.adiocionarConducao(this.conducao);
}

informarCadastro() {
    alert('Cadastro efetuado com sucesso!');
}
// cancelando cadastro
  cancelar() {
    this.router.navigate(['/index']);
  }
}
