import { Injectable } from '@angular/core';
import { Militar } from './militar';
import { Endereco } from './endereco';
import { PostoGraduacao } from './posto-graduacao';


@Injectable()
export class CrudMilitaresService {

contador = 0;

militares: Militar[] = [
  { precCP: 12345, codPostoGraduacao: 10, nome: 'Lucas' },
  { precCP: 4567, codPostoGraduacao: 8, nome: 'Grillo' }
];

enderecos: Endereco[] = [
  { codEndereco: 1, precCP: 12345, rua: 'Fronteira', bairro: 'Campo Novo', cidade: 'Porto Alegre', numero: 400, complemento: 'casa' },
  { codEndereco: 2, precCP: 4567, rua: 'Teresopolis', bairro: 'aaa', cidade: 'Porto Alegre', numero: 50, complemento: 'casa' }
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
    getMilitarPorPrecCP(precCP: number) {
      // tslint:disable-next-line:triple-equals
      return(this.militares.find(militar => militar.precCP == precCP));
    }
    // retorna um objeto endereco
    getEnderecoPorPrecCP(precCP: number) {
      // tslint:disable-next-line:triple-equals
      return(this.enderecos.find(endereco => endereco.precCP == precCP));
    }

    getPostoGraduacaoPorCodigo(codigo: number) {
      // tslint:disable-next-line:triple-equals
      return (this.postoGraduacoes.find(postoGraduacao => postoGraduacao.codPosto == codigo));
    }

    // melhorar tratamento de excecao
    adiocionarMilitar(militar: Militar, endereco: Endereco) {
        for ( let i = 0; i < this.militares.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (militar.precCP == this.militares[i].precCP ) {
                this.contador++;
            }
        }
        if (this.contador > 0 ) {
          // tslint:disable-next-line:max-line-length
          window.open('', 'janela', 'width=400, height=300, top=100, left=699, scrollbars=no, status=no, toolbar=no, location=no, menubar=no, resizable=no, fullscreen=no');
          window.document.write('precCP ja existe!');
        } else {
            endereco.precCP = militar.precCP;
            this.militares.push(militar);
            this.enderecos.push(endereco);
        }
    }

    // remove um militar do array
      removerMilitar(militar: Militar) {
        const indice = this.militares.indexOf(militar, 0);
        if (indice > -1) {
          this.militares.splice(indice, 1);
          this.enderecos.splice(indice, 1);
        }
      }

  atualizaMilitar(prec_cp: number, militar: Militar, endereco: Endereco) {
        const indiceMil = this.militares.indexOf(this.getMilitarPorPrecCP(prec_cp), 0);
        this.militares[indiceMil] = militar;

        const indiceEnd = this.enderecos.indexOf(this.getEnderecoPorPrecCP(prec_cp), 0);
        this.enderecos[indiceEnd] = endereco;
  }
}
