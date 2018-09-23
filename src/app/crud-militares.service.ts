import { Injectable } from '@angular/core';
import { Militar } from "./militar";


@Injectable()
export class CrudMilitaresService {
militares: Militar[] = [
  {codigo: 1, nome:"Lucas", prec_cp: 12345},
  {codigo: 2, nome:"Grillo", prec_cp: 4567}
]
autoIncrement:number=3;
  constructor() { }
    getMilitares(){
       return this.militares;
    }

    adiocionarMilitar(militar:Militar){
        militar.codigo=this.autoIncrement++;
        this.militares.push(militar);

  }

//retorna um objeto militar
  getMilitarPorCodigo(codigo:number){
      return(this.militares.find(militar => militar.codigo == codigo));
  }

//remove um militar do array
  removerMilitar(militar:Militar){
    let indice = this.militares.indexOf(militar, 0);
    if (indice > -1){
      this.militares.splice(indice, 1);
    }
  }

  atualizaMilitar(codigo:number, militar:Militar){
        let indice = this.militares.indexOf(this.getMilitarPorCodigo(codigo), 0);
        this.militares[indice] = militar;
  }
}
