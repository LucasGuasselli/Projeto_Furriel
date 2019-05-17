import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { PostoGraduacao } from '../posto-graduacao';
import { PostosGraduacoesService } from './../services/postosGraduacoes.service';
import { MilitaresService } from '../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitarDTO } from '../models/militar.dto';
import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';

@Component({
  selector: 'app-form-militares',
  templateUrl: './form-militares.component.html',
  styleUrls: ['./form-militares.component.css']
})
export class FormMilitaresComponent implements OnInit {
  titulo = 'Cadastro de Militares';

    militar: MilitarDTO;
    endereco: Endereco = new Endereco();
    postosGraduacoes: PostoGraduacaoDTO[] = [];

    precCP: number = null;

  constructor(private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.precCP = this.rota.snapshot.params['cod'];
    this.postosGraduacoesService.findAll().subscribe(response => {this.postosGraduacoes = response; } ,
      error => {console.log(error); } );

/* IF - cadastro ou quando o usuario insere um preccp invalido
    ELSE - serve para casos de edicao da entidade militar */
  if (isNaN(this.precCP)) {
    this.militar  = new MilitarDTO();
    // this.endereco  = new Endereco();
  } else {
    // this.militar = Object.assign({}, this.militaresService.getMilitarPorPrecCP(this.precCP));
    // this.endereco = Object.assign({}, this.militaresService.getEnderecoPorPrecCP(this.precCP));
     console.log(this.endereco);
    }
  }

  salvarMilitar() {
    if (isNaN(this.precCP)) {
        this.precCP = this.militar.precCP;
            // tslint:disable-next-line:triple-equals
            if (this.validaPrecCP() == true) {
              this.militaresService.insert(this.militar).subscribe(response => {
                    alert('Cadastro efetuado com sucesso'); } ,
                    error => {console.log(error); } );
              this.militar = new MilitarDTO();
              this.router.navigate(['/listaMilitares']);
            } else {
              // substituir por uma janela ou pop-up posteriormente
              console.log('valor invalido inserido no campo precCP');
            }
    // tslint:disable-next-line:triple-equals
    } else {
        console.log('chegou na edicao');
      // this.militaresService.atualizaMilitar(this.precCP, this.militar, this.endereco);
        this.router.navigate(['/listaMilitares']);
    }
}

  salvarPostoGraduacao(codigo: number) {
    if (isNaN(codigo)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.militar.postoGraduacaoId = codigo;
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
