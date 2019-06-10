import { Injectable } from '@angular/core';
import { MilitaresService } from './services/militares.service';
import { AtualizacaoAuxilioTransporte } from './atualizacao-auxilio-transporte';
import { AuxilioTransporteDTO } from './models/auxilioTransporte.dto';

@Injectable()
export class CrudAuxilioTransporteService {

// militar: Militar;
// postoGraduacao: PostoGraduacao;
// militaresSemAuxilioTransporte: Militar[] = [];
// auxiliosTransporteSemPublicacao: AuxilioTransporte[] = [];
// conducoesSemPublicacao: Conducao [] = [];

autoIncrementAT = 2;
autoIncrementConducao = 2;
autoIncrementDesconto = 1;
autoIncrementExclusaoAuxilioTransporte = 2;
autoIncrementInclusaoAuxilioTransporte = 1;
autoIncrementAtualizacaoAuxilioTransporte = 1;

atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporte[] = [];

  constructor(private servico: MilitaresService) { }

    getAT() {
      //  return this.auxiliosTransporte;
        }
    getATSemPublicacao() {
        // return this.auxiliosTransporteSemPublicacao;
    }


    getAtualizacaoAuxiliosTransporte() {
        return this.atualizacaoAuxilioTransporte;
    }

    getConducaoPorCodigo(codigo: number) {
        console.log(conducao => conducao.codConducao);
        console.log(codigo);
        // tslint:disable-next-line:triple-equals
      //  return(this.conducoes.find(conducao => conducao.codConducao == codigo));
    }

    getAuxilioTransportePorPrecCP(precCP: number) {
      // tslint:disable-next-line:triple-equals
   //   return(this.auxiliosTransporte.find(auxilioTransporte => auxilioTransporte.precCP == precCP));
    }

    adiocionarAT(AT: AuxilioTransporteDTO) {
      //  AT.codAT = this.autoIncrementAT++;
      // encontra o militar correspondente ao auxilio transporte
      //  this.militar = this.servico.getMilitarPorPrecCP(AT.precCP);
      // encontra o postoGraduacao correspondente para saber o valor da cota parte
      //  this.postoGraduacao = this.servico.getPostoGraduacaoPorCodigo(this.militar.codPostoGraduacao);

      //  AT.valorTotalAT = (this.postoGraduacao.cotaParte * -1 );
       //     this.auxiliosTransporte.push(AT);

    // this.militar = new Militar();
       // this.postoGraduacao = new PostoGraduacao();
      }
}
/*
  // TALVEZ SEJA NECESSARIO MODIFICAR O METODO QUANDO FOR PUBLICAR UM AUXILIO TRANSPORTE
  adiocionarConducao(conducao: Conducao) {
        conducao.codConducao = this.autoIncrementConducao++;
        this.conducoes.push(conducao);

        // atualizar valor total do AT cada vez que cadastrar uma conducao
        this.atualizaValorPassagem(conducao.precCP, conducao.valor);
  }

  atualizarConducao(conducao: Conducao) {
    for (let  i = 0; i < this.conducoes.length; i++) {
        if (this.conducoes[i].codConducao === conducao.codConducao) {
            this.conducoes[i] = conducao;
            this.atualizaValorPassagem(conducao.precCP, conducao.valor);
        }
    }
  }

  adiocionarExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte) {
    exclusaoAuxilioTransporte.codExclusaoAuxilioTransporte = this.autoIncrementExclusaoAuxilioTransporte++;
    this.exclusaoAuxiliosTransporte.push(exclusaoAuxilioTransporte);
  }

  adicionarAtualizacaoAuxilioTransporte(atualizacaoAuxilioTransporte: AtualizacaoAuxilioTransporte) {
    atualizacaoAuxilioTransporte.codAtualizacaoAuxilioTransporte = this.autoIncrementAtualizacaoAuxilioTransporte++;
    this.atualizacaoAuxilioTransporte.push(atualizacaoAuxilioTransporte);
    console.log(atualizacaoAuxilioTransporte);
  }


  atualizaValorPassagem(codigo: number, valor: number) {
    for (let i = 0; i < this.auxiliosTransporte.length; i++) {
          // tslint:disable-next-line:triple-equals
          if ( codigo == this.auxiliosTransporte[i].precCP) {
              this.auxiliosTransporte[i].valorTotalAT = this.auxiliosTransporte[i].valorTotalAT + (22 * valor);
              this.auxiliosTransporte[i].valorDiarioAT = this.auxiliosTransporte[i].valorTotalAT / 22;
          }
    }
  }


  atualizaValorPassagem(precCP: number, valor: number) {
    // encontra o militar correspondente ao auxilio transporte
    //  this.militar = this.servico.getMilitarPorPrecCP(precCP);
    // encontra o postoGraduacao correspondente para saber o valor da cota parte
    //  this.postoGraduacao = this.servico.getPostoGraduacaoPorCodigo(this.militar.codPostoGraduacao);

        for (let i = 0; i < this.auxiliosTransporte.length; i++) {
              // tslint:disable-next-line:triple-equals
              if (this.auxiliosTransporte[i].precCP == precCP) {
                // adicionando a COTA PARTE
            //        this.auxiliosTransporte[i].valorTotalAT = (this.postoGraduacao.cotaParte * -1 );
                      for (let k = 0; k < this.conducoes.length; k++) {
                          // tslint:disable-next-line:triple-equals
                          if (this.conducoes[k].precCP == precCP) {
                            this.auxiliosTransporte[i].valorTotalAT = this.auxiliosTransporte[i].valorTotalAT + (22 * valor);
                          }
                      }
                this.auxiliosTransporte[i].valorDiarioAT = this.auxiliosTransporte[i].valorTotalAT / 22;
              }
        }
//  this.militar = new Militar();
     // this.postoGraduacao = new PostoGraduacao();
  }

  subtraiValorPassagem(codigo: number, valor: number) {
        for (let i = 0; i < this.auxiliosTransporte.length; i++) {
            // tslint:disable-next-line:triple-equals
            if ( codigo == this.auxiliosTransporte[i].precCP) {
                this.auxiliosTransporte[i].valorTotalAT = this.auxiliosTransporte[i].valorTotalAT - (22 * valor);
                this.auxiliosTransporte[i].valorDiarioAT = this.auxiliosTransporte[i].valorTotalAT / 22;
            }
    }
  }

  calculaValorDesconto(codigo: number) {
    for (let i = 0; i < this.auxiliosTransporte.length; i++) {
        // tslint:disable-next-line:triple-equals
        if ( codigo == this.auxiliosTransporte[i].precCP) {
            return this.auxiliosTransporte[i].valorDiarioAT;
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
      for (let k = 0; k < this.auxiliosTransporte.length; k++) {
        // tslint:disable-next-line:triple-equals
        if (this.auxiliosTransporte[k].precCP == precCP) {
            this.removerAuxilioTransporte(this.auxiliosTransporte[k]);
        }
    }
  }

  adicionarDesconto(desconto: Desconto) {
      desconto.codDesconto = this.autoIncrementDesconto++;
      desconto.valorDesconto = this.calculaValorDesconto(desconto.precCP);
      this.descontos.push(desconto);
  }

  removerConducao(conducao: Conducao) {
    this.subtraiValorPassagem(conducao.precCP, conducao.valor);

    const indice = this.conducoes.indexOf(conducao, 0);
    if (indice > -1) {
      this.conducoes.splice(indice, 1);
    }
  }

  removerAuxilioTransporte(auxilioTransporte: AuxilioTransporte) {
    const indice = this.auxiliosTransporte.indexOf(auxilioTransporte, 0);
    if (indice > -1) {
      this.auxiliosTransporte.splice(indice, 1);
    }
  }

  removerExclusaoAuxilioTransporte(exclusaoAuxilioTransporte: ExclusaoAuxilioTransporte) {
    const indice = this.exclusaoAuxiliosTransporte.indexOf(exclusaoAuxilioTransporte, 0);
    if (indice > -1) {
      this.exclusaoAuxiliosTransporte.splice(indice, 1);
    }
  }

}
*/
/*

adiocionarConducaoSemPublicacao(conducao: Conducao) {
    conducao.codConducao = this.autoIncrementConducao++;
    this.conducoesSemPublicacao.push(conducao);
    console.log(this.conducoesSemPublicacao);
    // atualizar valor total do AT cada vez que cadastrar uma conducao
    this.atualizaValorPassagemATSemPublicacao(conducao.precCP, conducao.valor);
  }

  atualizaValorPassagemATSemPublicacao(codigo: number, valor: number) {
    for (let i = 0; i < this.auxiliosTransporteSemPublicacao.length; i++) {
          // tslint:disable-next-line:triple-equals
          if ( codigo == this.auxiliosTransporteSemPublicacao[i].precCP) {
              this.auxiliosTransporteSemPublicacao[i].valorTotalAT = this.auxiliosTransporteSemPublicacao[i].valorTotalAT + (22 * valor);
              this.auxiliosTransporteSemPublicacao[i].valorDiarioAT = this.auxiliosTransporteSemPublicacao[i].valorTotalAT / 22;
          }
    }
 }

*/
