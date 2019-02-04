import { Injectable } from '@angular/core';
import { Militar } from './militar';
import { AuxilioTransporte } from './auxilio-transporte';
import { Conducao } from './conducao';
import { CrudMilitaresService } from './crud-militares.service';
import { PostoGraduacao } from './posto-graduacao';
import { Desconto } from './desconto';

@Injectable()
export class CrudAuxilioTransporteService {

militar: Militar;
postoGraduacao: PostoGraduacao;

auxilioTransportes: AuxilioTransporte[] = [
    {codAT: 1, precCP: 12345, valorTotalAT: -107.756, valorDiarioAT: 12 }
];

conducoes: Conducao[] = [
  {codConducao: 1, precCP: 1, codAT: 1, itinerario: 'Centro-Bairro', nomeEmpresa: 'SOUL', tipoDeTransporte: 'Onibus', valor: 10 }
];

descontos: Desconto[] = [
];

autoIncrementAT = 2;
autoIncrementConducao = 2;
autoIncrementDesconto = 1;

  constructor(private servico: CrudMilitaresService) { }
    getAT() {
        return this.auxilioTransportes;
        }
    getConducoes() {
        return this.conducoes;
    }
    getDescontos() {
        return this.descontos;
    }

    // retorna um objeto conducao
    getConducaoPorCodigo(codigo: number) {
        console.log(conducao => conducao.codConducao);
        console.log(codigo);
        // tslint:disable-next-line:triple-equals
        return(this.conducoes.find(conducao => conducao.codConducao == codigo));
    }

    adiocionarAT(AT: AuxilioTransporte) {
      AT.codAT = this.autoIncrementAT++;
    // encontra o militar correspondente ao auxilio transporte
      this.militar = this.servico.getMilitarPorPrecCP(AT.precCP);
    // encontra o postoGraduacao correspondente para saber o valor da cota parte
      this.postoGraduacao = this.servico.getPostoGraduacaoPorCodigo(this.militar.codPostoGraduacao);

      AT.valorTotalAT = (this.postoGraduacao.cotaParte * -1 );
      console.log(AT.valorTotalAT);
          this.auxilioTransportes.push(AT);

      // this.militar = new Militar();
      // this.postoGraduacao = new PostoGraduacao();
      console.log('codigo do militar:' + this.auxilioTransportes[1].precCP);
  }

  adiocionarConducao(conducao: Conducao) {
        conducao.codConducao = this.autoIncrementConducao++;
        this.conducoes.push(conducao);

        this.atualizaValorPassagem(conducao.precCP, conducao.valor);

        // atualizar valor total do AT cada vez que cadastrar uma conducao
  }

  atualizaValorPassagem(codigo: number, valor: number) {
        for (let i = 0; i < this.auxilioTransportes.length; i++) {
              // tslint:disable-next-line:triple-equals
              if ( codigo == this.auxilioTransportes[i].precCP) {
                  this.auxilioTransportes[i].valorTotalAT = this.auxilioTransportes[i].valorTotalAT + (22 * valor);
                  this.auxilioTransportes[i].valorDiarioAT = this.auxilioTransportes[i].valorTotalAT / 22;
              }
        }
  }

  subtraiValorPassagem(codigo: number, valor: number) {
        for (let i = 0; i < this.auxilioTransportes.length; i++) {
            // tslint:disable-next-line:triple-equals
            if ( codigo == this.auxilioTransportes[i].precCP) {
                this.auxilioTransportes[i].valorTotalAT = this.auxilioTransportes[i].valorTotalAT - (22 * valor);
                this.auxilioTransportes[i].valorDiarioAT = this.auxilioTransportes[i].valorTotalAT / 22;
            }
    }
  }

  calculaValorDesconto(codigo: number) {
    for (let i = 0; i < this.auxilioTransportes.length; i++) {
        // tslint:disable-next-line:triple-equals
        if ( codigo == this.auxilioTransportes[i].precCP) {
            return this.auxilioTransportes[i].valorDiarioAT;
        }
}
  }
  adicionarDesconto(desconto: Desconto) {
    console.log(desconto);

      desconto.codDesconto = this.autoIncrementDesconto++;
      desconto.valorDesconto = this.calculaValorDesconto(desconto.precCP);
      this.descontos.push(desconto);
      console.log(this.descontos[0]);
  }

// remove uma conducao do array
removerConducao(conducao: Conducao) {
    this.subtraiValorPassagem(conducao.precCP, conducao.valor);

    const indice = this.conducoes.indexOf(conducao, 0);
    if (indice > -1) {
      this.conducoes.splice(indice, 1);
    }
  }

}
