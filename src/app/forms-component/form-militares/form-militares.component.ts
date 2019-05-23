import { Component, OnInit } from '@angular/core';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitarDTO } from '../../models/militar.dto';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecosService } from '../../services/enderecos.service';

@Component({
  selector: 'app-form-militares',
  templateUrl: './form-militares.component.html',
  styleUrls: ['./form-militares.component.css']
})
export class FormMilitaresComponent implements OnInit {
  titulo = 'Cadastro de Militares';

    militar: MilitarDTO = new MilitarDTO();
    endereco: EnderecoDTO = new EnderecoDTO();
    postosGraduacoes: PostoGraduacaoDTO[] = [];

    precCP: number = null;

  constructor(private militaresService: MilitaresService,
              private enderecosService: EnderecosService,
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
    this.endereco  = new EnderecoDTO();
  } else {
    this.militaresService.findMilitarByPrecCP(this.precCP).subscribe( response => {
                      this.militar = response; }, error => {console.log(error); } );

    this.enderecosService.findEnderecoByPrecCP(this.precCP).subscribe( response => {
                      this.endereco = response; }, error => {console.log(error); } );
    console.log(this.endereco.militarPrecCP);
    }
  }

  // salva  ou edita uma entidade militar e endereco no banco de dados
  salvarMilitar() {
    if (isNaN(this.precCP)) {
        this.precCP = this.militar.precCP;
            // tslint:disable-next-line:triple-equals
            if (this.validaPrecCP() == true) {
              // fazendo com que "o endereco saiba a qual militar pertence"
                this.endereco.militarPrecCP = this.militar.precCP;

              this.militaresService.insert(this.militar).subscribe(response => {
                  console.log('Cadastro efetuado com sucesso!'); } ,
                  error => {console.log(error); } );
                      this.militar = new MilitarDTO();
              this.enderecosService.insert(this.endereco).subscribe(response => {
                  console.log('Endereco cadastrado com sucesso!'); },
                  error => {console.log(error); } );
                      this.endereco = new EnderecoDTO();
              // redireciona para a lista
                  this.router.navigate(['/listaMilitares']);
            } else {
              // substituir por uma janela ou pop-up posteriormente
              alert('valor invalido inserido no campo precCP');
            }
    } else {
        console.log('chegou na edicao' + this.precCP);
          // fazendo com que "o endereco saiba a qual militar pertence"
          this.endereco.militarPrecCP = this.militar.precCP;

          this.militaresService.update(this.militar, this.precCP).subscribe(response => {
              console.log('Militar editado com sucesso!'); } ,
              error => {console.log(error); } );
                  this.militar = new MilitarDTO();
          this.enderecosService.update(this.endereco, this.endereco.id).subscribe(response => {
              console.log('Endereco editado com sucesso!'); } ,
              error => {console.log(error); } );
                  this.endereco = new EnderecoDTO();

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