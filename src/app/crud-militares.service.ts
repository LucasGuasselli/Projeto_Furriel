import { Injectable } from '@angular/core';
import { Militar } from './militar';
import { Endereco } from './endereco';
import { PostoGraduacao } from './posto-graduacao';


@Injectable()
export class CrudMilitaresService {
militares: Militar[] = [
  {codigo: 1, codPostoGraduacao: 10, nome: 'Lucas', prec_cp: 12345},
  {codigo: 2, codPostoGraduacao: 8, nome: 'Grillo', prec_cp: 4567}
];

enderecos: Endereco[] = [
  { codEndereco: 1, codMilitar: 1, rua: 'Fronteira', bairro: 'Campo Novo', cidade: 'Porto Alegre', numero: 400, complemento: 'casa' },
  { codEndereco: 2, codMilitar: 2, rua: 'Teresopolis', bairro: 'aaa', cidade: 'Porto Alegre', numero: 50, complemento: 'casa' }
];

postoGraduacoes: PostoGraduacao[] = [
  { codPosto: 1, nome: 'Major', soldo: 10472.00, cotaParte: 628.32},
  { codPosto: 2, nome: 'Capitao', soldo: 8517.00, cotaParte: 511.02},
  { codPosto: 3, nome: '1º Tenente', soldo: 7796.00, cotaParte: 467.76},
  { codPosto: 4, nome: '2º Tenente', soldo: 7082.00, cotaParte: 311.608},
  { codPosto: 5, nome: 'Aspirante', soldo: 6625.00, cotaParte: 397.5},
  { codPosto: 6, nome: 'SubTenente', soldo: 5751.00, cotaParte: 256.044},
  { codPosto: 7, nome: '1º Sargento', soldo: 5110.00, cotaParte: 224.84},
  { codPosto: 8, nome: '2º Sargento', soldo: 4445.00, cotaParte: 195.58},
  { codPosto: 9, nome: '3º Sargento', soldo: 3584.00, cotaParte: 157.696},
  { codPosto: 10, nome: 'Cabo', soldo: 2449.00, cotaParte: 107.756},
  { codPosto: 11, nome: 'Soldado EP', soldo: 1758.00, cotaParte: 65.032},
  { codPosto: 12, nome: 'Soldado EV', soldo: 854.00, cotaParte: 37.576},
];

autoIncrement = 3;

  constructor() { }
    getMilitares() {
       return this.militares;
    }
    getEnderecos() {
      return this.enderecos;
    }
    getPostoGraduacao() {
      return this.postoGraduacoes;
    }

    // retorna um objeto militar
    getMilitarPorCodigo(codigo: number) {
      return(this.militares.find(militar => militar.codigo == codigo));
}

    // retorna um objeto endereco
    getEnderecoPorCodigo(codigo: number) {
      return(this.enderecos.find(endereco => endereco.codMilitar == codigo));
}

    getPostoGraduacaoPorCodigo(codigo: number) {
      return (this.postoGraduacoes.find(postoGraduacao => postoGraduacao.codPosto == codigo));
    }

    adiocionarMilitar(militar: Militar, endereco: Endereco) {
        militar.codigo = this.autoIncrement++;
        endereco.codMilitar = militar.codigo;
        endereco.codMilitar = militar.codigo;

        this.militares.push(militar);
        this.enderecos.push(endereco);
  }

// remove um militar do array
  removerMilitar(militar: Militar) {
    let indice = this.militares.indexOf(militar, 0);
    if (indice > -1) {
      this.militares.splice(indice, 1);
      this.enderecos.splice(indice, 1);
    }
  }

  atualizaMilitar(codigo: number, militar: Militar, endereco: Endereco) {
        let indiceMil = this.militares.indexOf(this.getMilitarPorCodigo(codigo), 0);
        this.militares[indiceMil] = militar;
        let indiceEnd = this.enderecos.indexOf(this.getEnderecoPorCodigo(codigo), 0);
        this.enderecos[indiceEnd] = endereco;
  }
}
