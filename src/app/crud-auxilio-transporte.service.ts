import { Injectable } from '@angular/core';
import { Militar } from "./militar";
import { AuxilioTransporte } from "./auxilio-transporte";
import { Conducao } from "./conducao";

@Injectable()
export class CrudAuxilioTransporteService {

auxilioTransportes: AuxilioTransporte[] = [  {codAT: 1, codMilitar:1, valorTotalAT:1000, valorDiarioAT: 12} ]

conducoes: Conducao[] = [
  {codConducao: 1, codMilitar:1, codAT:1, itinerario:"Centro-Bairro",nomeEmpresa:"SOUL", tipoDeTransporte:"Onibus", valor: 10 }
]

autoIncrementAT:number=2;
autoIncrementConducao:number=2;

  constructor() { }
  getAT(){
       return this.auxilioTransportes;
    }
  getConducoes(){
       return this.conducoes;
  }

  adiocionarAT(AT:AuxilioTransporte){
        AT.codAT =this.autoIncrementAT++;  
        this.auxilioTransportes.push(AT);
        console.log("codigo do militar:" + this.auxilioTransportes[1].codMilitar);
  }

  adiocionarConducao(conducao:Conducao){
        conducao.codConducao =this.autoIncrementConducao++;  
        this.conducoes.push(conducao);
  }

  
}
