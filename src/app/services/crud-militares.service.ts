import { Injectable } from '@angular/core';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { PostoGraduacao } from '../posto-graduacao';
import { AuxilioTransporte } from '../auxilio-transporte';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { MilitarDTO } from '../models/MilitarDTO';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CrudMilitaresService {

  contador = 0;

  militares: Militar[] = [];
  enderecos: Endereco[] = [];
  postoGraduacoes: PostoGraduacao[] = [];

  autoIncrement = 3;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<MilitarDTO[]> {
        return this.http.get<MilitarDTO[]>(`${API_CONFIG.baseUrl}/militares`);
    }

    getMilitares() {
       return this.militares;
    }
    getEnderecos() {
      return this.enderecos;
    }
    getPostoGraduacao() {
      return this.postoGraduacoes;
    }

    getMilitarPorPrecCP(precCP: number) {
      // tslint:disable-next-line:triple-equals
      return(this.militares.find(militar => militar.precCP == precCP));
    }

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
