import { Injectable } from '@angular/core';
import { Militar } from './militar';
import { AuxilioTransporte } from './auxilio-transporte';
import { Conducao } from './conducao';
import { CrudMilitaresService } from './crud-militares.service';
import { PostoGraduacao } from './posto-graduacao';

@Injectable()
export class CrudAuxilioTransporteService {

militar: Militar;
postoGraduacao: PostoGraduacao;

auxilioTransportes: AuxilioTransporte[] = [  {codAT: 1, codMilitar: 1, valorTotalAT: -107.756, valorDiarioAT: 12} ];

conducoes: Conducao[] = [
  {codConducao: 1, codMilitar: 1, codAT: 1, itinerario: 'Centro-Bairro', nomeEmpresa: 'SOUL', tipoDeTransporte: 'Onibus', valor: 10 }
];

autoIncrementAT = 2;
autoIncrementConducao = 2;

  constructor(private servico: CrudMilitaresService) { }
  getAT() {
       return this.auxilioTransportes;
    }
  getConducoes() {
       return this.conducoes;
  }

  adiocionarAT(AT: AuxilioTransporte) {
      AT.codAT = this.autoIncrementAT++;
    // encontra o militar correspondente ao auxilio transporte
      this.militar = this.servico.getMilitarPorCodigo(AT.codMilitar);
    // encontra o postoGraduacao correspondente para saber o valor da cota parte
      this.postoGraduacao = this.servico.getPostoGraduacaoPorCodigo(this.militar.codPostoGraduacao);

      AT.valorTotalAT = (this.postoGraduacao.cotaParte * -1 );
      console.log(AT.valorTotalAT);
          this.auxilioTransportes.push(AT);

      // this.militar = new Militar();
      // this.postoGraduacao = new PostoGraduacao();
      console.log('codigo do militar:' + this.auxilioTransportes[1].codMilitar);
  }

  adiocionarConducao(conducao: Conducao) {
        conducao.codConducao = this.autoIncrementConducao++;
        this.conducoes.push(conducao);

        this.atualizaValorPassagem(conducao.codMilitar, conducao.valor);

        // atualizar valor total do AT cada vez que cadastrar uma conducao
  }

  atualizaValorPassagem(codigo: number, valor: number) {

      for (let i = 0; i < this.auxilioTransportes.length; i++) {
              // tslint:disable-next-line:triple-equals
              if ( codigo == this.auxilioTransportes[i].codMilitar) {
                  this.auxilioTransportes[i].valorTotalAT = this.auxilioTransportes[i].valorTotalAT + (22 * valor);
                  this.auxilioTransportes[i].valorDiarioAT = this.auxilioTransportes[i].valorTotalAT / 22;
              }
      }
  }
}
