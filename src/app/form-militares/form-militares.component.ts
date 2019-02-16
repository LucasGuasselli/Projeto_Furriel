import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { PostoGraduacao } from '../posto-graduacao';
import { CrudMilitaresService } from '../crud-militares.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-militares',
  templateUrl: './form-militares.component.html',
  styleUrls: ['./form-militares.component.css']
})
export class FormMilitaresComponent implements OnInit {
  titulo = 'Cadastro de Militares';

    militar: Militar;
    endereco: Endereco;
    postoGraduacao: PostoGraduacao[] = [];

    precCP: number = null;
    // codEndereco: number;
    // serve para
    // contador = 0;

  constructor(private servico: CrudMilitaresService, private router: Router, private rota: ActivatedRoute) { }

// o que acontece ao iniciar a classe
  ngOnInit() {
    this.precCP = this.rota.snapshot.params['cod'];
    console.log(this.precCP);
    this.postoGraduacao = this.servico.getPostoGraduacao();

  if (isNaN(this.precCP)) {
    // CADASTRAR
    this.militar  = new Militar();
    this.endereco  = new Endereco();

  } else {
    // EDITAR
    this.militar = Object.assign({}, this.servico.getMilitarPorPrecCP(this.precCP));
    this.endereco = Object.assign({}, this.servico.getEnderecoPorPrecCP(this.precCP));
     console.log(this.endereco);
    // console.log('chegou aqui');

    }
  }

/*
    Em casos de cadastro ou quando o usuario insere um preccp invalido, caira no IF,
    e o else serve para casos de edicao da entidade militar
*/
  salvarMilitar() {
    if (isNaN(this.precCP)) {
        this.precCP = this.militar.precCP;
            // tslint:disable-next-line:triple-equals
            if (this.validaPrecCP() == true) {
              this.servico.adiocionarMilitar(this.militar, this.endereco);
              this.militar = new Militar();
              this.router.navigate(['/listaMilitares']);
            } else {
              // substituir por uma janela ou pop-up posteriormente
              console.log('valor invalido inserido no campo precCP');
            }
    // tslint:disable-next-line:triple-equals
    } else {
        console.log('chegou na edicao');
        this.servico.atualizaMilitar(this.precCP, this.militar, this.endereco);
        this.router.navigate(['/listaMilitares']);
    }
}

  salvarPostoGraduacao(codigo: number) {
    if (isNaN(codigo)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.militar.codPostoGraduacao = codigo;
        console.log(codigo);
    }
  }

  validaPrecCP() {
      if (Number.isInteger(this.militar.precCP)) {
        return true;
      } else {
        return false;
      }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}// fecha classe
