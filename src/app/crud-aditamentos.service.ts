import { Injectable } from '@angular/core';
import { Aditamento } from './aditamento';

@Injectable()
export class CrudAditamentosService {

  aditamentoAtual: Aditamento;

  aditamentos: Aditamento[] = [
    { codAditamento: 1, nome: '20-JAN_19FEV_19', data: null}
  ];

  autoIncrement = 2;
  constructor() { }

  getAditamentos() {
    return this.aditamentos;
  }

  adicionarAditamento(aditamento: Aditamento) {
      aditamento.codAditamento = this.autoIncrement++;
      this.aditamentos.push(aditamento);
  }

  retornaAditamentoPorCod(codigo: Number) {
      for ( let i = 0; i < this.aditamentos.length; i++) {
          if (this.aditamentos[i].codAditamento == codigo) {
                return this.aditamentos[i];
          }
      }
  }

    salvarAditamentoAtual(codigo: number) {
        for ( let i = 0; i < this.aditamentos.length; i++) {
            if (this.aditamentos[i].codAditamento == codigo) {
                this.aditamentoAtual = this.aditamentos[i];
            }
        // testando se o aditamento selecionado na pagina inicial foi definido como atual
        console.log(this.aditamentoAtual);
        }
    }
}
