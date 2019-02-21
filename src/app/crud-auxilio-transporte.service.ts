import { Injectable } from '@angular/core';
import { Militar } from './militar';
import { AuxilioTransporte } from './auxilio-transporte';
import { Conducao } from './conducao';
import { CrudMilitaresService } from './crud-militares.service';
import { PostoGraduacao } from './posto-graduacao';
import { Desconto } from './desconto';
import { ExclusaoAuxilioTransporte } from './exclusao-auxilio-transporte';

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


exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporte[] = [
  {codExclusaoAuxilioTransporte: 1, precCP: 12345, codAditamento: 1, data: null, motivo: 'aa', valor: 10 }
];

autoIncrementAT = 2;
autoIncrementConducao = 2;
autoIncrementDesconto = 1;
autoIncrementExclusaoAuxilioTransporte = 2;

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
    getExclusaoAuxilioTransporte() {
        return this.exclusaoAuxiliosTransporte;
    }

    getConducaoPorCodigo(codigo: number) {
        console.log(conducao => conducao.codConducao);
        console.log(codigo);
        // tslint:disable-next-line:triple-equals
        return(this.conducoes.find(conducao => conducao.codConducao == codigo));
    }

    getAuxilioTransportePorPrecCP(precCP: number) {
      // tslint:disable-next-line:triple-equals
      return(this.auxilioTransportes.find(auxilioTransporte => auxilioTransporte.precCP == precCP));
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

        // atualizar valor total do AT cada vez que cadastrar uma conducao
        this.atualizaValorPassagem(conducao.precCP, conducao.valor);

  }

  adiocionarExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte) {
    exclusaoAuxilioTransporte.codExclusaoAuxilioTransporte = this.autoIncrementExclusaoAuxilioTransporte++;
    this.exclusaoAuxiliosTransporte.push(exclusaoAuxilioTransporte);
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

  // remove o auxilio transporte bem como suas conducoes
  excluirAuxilioTransporte(precCP: number) {
      // removendo as conducoes
      for (let k = 0; k < this.conducoes.length; k++) {
          // tslint:disable-next-line:triple-equals
          if (this.conducoes[k].precCP == precCP) {
              this.removerConducao(this.conducoes[k]);
          }
      }

      // removendo o auxilio transporte
      for (let k = 0; k < this.auxilioTransportes.length; k++) {
        // tslint:disable-next-line:triple-equals
        if (this.auxilioTransportes[k].precCP == precCP) {
            this.removerAuxilioTransporte(this.auxilioTransportes[k]);
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

  removerConducao(conducao: Conducao) {
    this.subtraiValorPassagem(conducao.precCP, conducao.valor);

    const indice = this.conducoes.indexOf(conducao, 0);
    if (indice > -1) {
      this.conducoes.splice(indice, 1);
    }
  }

  removerAuxilioTransporte(auxilioTransporte: AuxilioTransporte) {
    const indice = this.auxilioTransportes.indexOf(auxilioTransporte, 0);
    if (indice > -1) {
      this.auxilioTransportes.splice(indice, 1);
    }
  }

  removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte) {
    const indice = this.exclusaoAuxiliosTransporte.indexOf(exclusaoAuxilioTransporte, 0);
    if (indice > -1) {
      this.exclusaoAuxiliosTransporte.splice(indice, 1);
    }
  }

}
