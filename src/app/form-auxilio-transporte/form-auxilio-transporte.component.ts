import { Component, OnInit } from '@angular/core';
import { CrudMilitaresService } from '../crud-militares.service';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from "@angular/router";
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

  titulo = "Cadastro de AuxilioTransporte";
  //objetos
  conducao:Conducao = new Conducao();;
  AT:AuxilioTransporte = new AuxilioTransporte();
  auxilioTransporte:AuxilioTransporte[] = [];
  postoGraduacao: PostoGraduacao[] = [];
  militar:Militar[] = [];

  //codigos 
  codMilitar:number;
  codAT:number;
  codConducao:number;

  verifica:boolean = false;

  constructor(private servicoCrudMilitares:CrudMilitaresService,private servicoCrudAT:CrudAuxilioTransporteService,
              private router:Router, private rota:ActivatedRoute) { }

  //ao iniciar a classe e instanciado um objeto militar
  ngOnInit() {
       this.auxilioTransporte = this.servicoCrudAT.getAT();
       this.militar = this.servicoCrudMilitares.getMilitares();
       this.postoGraduacao = this.servicoCrudMilitares.getPostoGraduacao();

      console.log(this.auxilioTransporte[0].codMilitar);
  if (isNaN(this.codMilitar)){
      //CADASTRAR
      this.conducao  = new Conducao();

  }else{
      //EDITAR
      //this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
      //this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));
    }
  }

//caso o militar nao tenha um Aux Transporte ele sera criado
verificaAT(){
    
    if(isNaN(this.codMilitar)){
        //CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    }else{
        //SE O MILITAR JA TEM AUX TRANSPORTE SO E CADASTRADO A CONDUCAO A MAIS
        for(var i = 0; i < this.auxilioTransporte.length;i++){
              if(this.auxilioTransporte[i].codMilitar == this.codMilitar){
                    this.salvarConducao(this.auxilioTransporte[0].codMilitar,this.auxilioTransporte[0].codAT);
                    this.verifica = true;
                    console.log("ja tem aux transporte");
              }
        }
    }//fecha if-else
    if(this.verifica == false){
        this.salvarAT(this.codMilitar);
        this.auxilioTransporte = this.servicoCrudAT.getAT();
        this.verifica = true;
        this.verificaAT();
        console.log(this.auxilioTransporte.length);
    }
    this.verifica = false;
    //atualiza o pessoal que tem auxilio transporte
    this.auxilioTransporte = this.servicoCrudAT.getAT();
    //verifica = false;
}//fecha metodo

salvarCodMilitar(codigo:number){
    if(isNaN(codigo)){
        //CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    }else{
        this.codMilitar = codigo;
        console.log(this.codMilitar);
    }
}

salvarAT(codigo:number){
    this.AT.codMilitar = codigo;
    this.AT.valorDiarioAT = 0;
    this.AT.valorTotalAT = 0;

    this.servicoCrudAT.adiocionarAT(this.AT);
}

salvarConducao(codMilitar:number,codAT:number){
    this.conducao.codMilitar = codMilitar;
    this.conducao.codAT = codAT;

    this.servicoCrudAT.adiocionarConducao(this.conducao);
}
//cancelando cadastro
  cancelar(){
    this.router.navigate(['/index']);
  }
}
