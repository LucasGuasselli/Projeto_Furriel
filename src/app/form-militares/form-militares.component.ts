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
  // objetos
  militar: Militar;
  endereco: Endereco;
  postoGraduacao: PostoGraduacao[] = [];
  // codigos
  codMilitar: number;
  codEndereco: number;
  constructor(private servico: CrudMilitaresService, private router: Router, private rota: ActivatedRoute) { }

// ao iniciar a classe e instanciado um objeto militar
  ngOnInit() {
    this.codMilitar = this.rota.snapshot.params['cod'];
    
    this.postoGraduacao = this.servico.getPostoGraduacao();

  if (isNaN(this.codMilitar)) {
    // CADASTRAR
    this.militar  = new Militar();
    this.endereco  = new Endereco();

  } else {
    // EDITAR
    this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
    this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));
    console.log(this.militar);

    }
  }

// adicionando um militar no array
  salvarMilitar() {
    if (isNaN(this.codMilitar)) {
       this.servico.adiocionarMilitar(this.militar, this.endereco);
       this.militar = new Militar();
    } else {
      this.servico.atualizaMilitar(this.codMilitar, this.militar, this.endereco);
    }
    this.router.navigate(['/listaMilitares']);
}

  salvarPostoGraduacao(codigo: number) {
    if (isNaN(codigo)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.militar.codPostoGraduacao = codigo;
        console.log(codigo);
    }
  }
// cancelando cadastro
  cancelar() {
    this.router.navigate(['/index']);
  }

}// fecha classe
