import { Injectable } from '@angular/core';
import { PagamentoAtrasado } from './pagamento-atrasado';

@Injectable()
export class CrudPagamentoAtrasadoService {

  autoIncrementPagamentoAtrasado = 2;
    pagamentosAtrasados: PagamentoAtrasado[] = [
      { codPgmtoAtrasado: 1, precCP: 1, codAditamento: 1, mesReferencia: 'janeiro',
      quantidadeDeDias: 1, motivo: 'aa', valor: 22, data: null },
    ];

  constructor() { }

    getPagamentosAtrasados() {
        return this.pagamentosAtrasados;
    }

  // codigo do pagamento atrasado
    getMilitarPorCod(codigo: number) {
      // tslint:disable-next-line:triple-equals
      return(this.pagamentosAtrasados.find(pagamentoAtrasado => pagamentoAtrasado.codPgmtoAtrasado == codigo));
    }

    getPagamentoAtrasadoPorCod(codigo: number) {
        for ( let i = 0; i < this.getPagamentosAtrasados.length; i++) {
              // tslint:disable-next-line:triple-equals
              if (this.getPagamentosAtrasados[i].codPgmtoAtrasado == codigo) {
                  return this.getPagamentosAtrasados[i];
              }
        }
    }

    adiocionarPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasado) {
        pagamentoAtrasado.codPgmtoAtrasado = this.autoIncrementPagamentoAtrasado++;
        this.pagamentosAtrasados.push(pagamentoAtrasado);
    }

    removerPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasado) {
      const indice = this.pagamentosAtrasados.indexOf(pagamentoAtrasado, 0);
      if (indice > -1) {
        this.pagamentosAtrasados.splice(indice, 1);
      }
    }

    // editar
    atualizaPagamentoAtrasado(codigo: number, pagamentoAtrasado: PagamentoAtrasado) {
      const indicePgmtoAtrasado = this.pagamentosAtrasados.indexOf(this.getPagamentoAtrasadoPorCod(codigo), 0);
      this.pagamentosAtrasados[indicePgmtoAtrasado] = pagamentoAtrasado;
    }
}
