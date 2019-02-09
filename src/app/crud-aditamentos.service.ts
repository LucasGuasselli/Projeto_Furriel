import { Injectable } from '@angular/core';
import { Aditamento } from './aditamento';

@Injectable()
export class CrudAditamentosService {

    aditamentoAtual: Aditamento;
    aditamentosSemData: Aditamento[] = [];
    aditamentos: Aditamento[] = [
        { codAditamento: 1, nome: '20-JAN_19FEV_19', data: null }
    ];

    autoIncrement = 2;
    constructor() { }

    getAditamentos() {
        return this.aditamentos;
    }

    getAditamentoAtual() {
        return this.aditamentoAtual;
    }

    getAditamentosSemData() {
        for ( let i = 0; i < this.aditamentos.length; i++) {
            if (this.aditamentos[i].data == null) {
                    this.aditamentosSemData.push(this.aditamentos[i]);
            }
        }
        return this.aditamentosSemData;
    }

    adicionarAditamento(aditamento: Aditamento) {
        aditamento.codAditamento = this.autoIncrement++;
        this.aditamentos.push(aditamento);
    }

    retornaAditamentoPorCod(codigo: Number) {
        for ( let i = 0; i < this.aditamentos.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (this.aditamentos[i].codAditamento == codigo) {
                    return this.aditamentos[i];
            }
        }
    }

    salvarAditamentoAtual(codigo: number) {
        for ( let i = 0; i < this.aditamentos.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (this.aditamentos[i].codAditamento == codigo) {
                this.aditamentoAtual = this.aditamentos[i];
            }
        // testando se o aditamento selecionado na pagina inicial foi definido como atual
        console.log(this.aditamentoAtual);
        }
    }
}
