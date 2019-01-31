import { Injectable } from '@angular/core';
import { Aditamento } from './aditamento';

@Injectable()
export class CrudAditamentosService {

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
}
