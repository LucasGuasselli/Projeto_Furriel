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
    cep: String;

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
      alert('O Prec-CP não deve ser alterado!');
      this.loadUpdateMilitarAndEndereco();
      console.log(this.endereco.militarPrecCP);
    }
  }

  // salva  ou edita uma entidade militar e endereco
  saveMilitar() {
    if (isNaN(this.precCP)) {
        this.precCP = this.militar.precCP;
            // tslint:disable-next-line:triple-equals
            if (this.validaPrecCP() == true) {
              // fazendo com que "o endereco saiba a qual militar pertence"
                this.endereco.militarPrecCP = this.militar.precCP;
              this.insertMilitar();
              // redireciona para a lista
                  this.router.navigate(['/listaMilitares']);
            } else {
              // substituir por uma janela ou pop-up posteriormente
              alert('valor inválido inserido no campo Prec-CP');
            }
    } else {
        console.log('chegou na edicao' + this.precCP);
          // fazendo com que "o endereco saiba a qual militar pertence"
          this.endereco.militarPrecCP = this.militar.precCP;
            this.updateMilitarAndEndereco();
                this.router.navigate(['/listaMilitares']);
    }
  }

  insertMilitar() {
    this.militaresService.insert(this.militar).subscribe(response => {
              this.insertEndereco(); console.log('Cadastro efetuado com sucesso!');  } ,
      error => {console.log(error); } );
          this.militar = new MilitarDTO();
  }

  insertEndereco() {
    this.enderecosService.insert(this.endereco).subscribe(response => {
      console.log('Endereco cadastrado com sucesso!'); },
      error => {console.log(error); } );
          this.endereco = new EnderecoDTO();
  }

  loadUpdateMilitarAndEndereco() {
    this.militaresService.findMilitarByPrecCP(this.precCP).subscribe( response => {
      this.militar = response; }, error => {console.log(error); } );

    this.enderecosService.findEnderecoByPrecCP(this.precCP).subscribe( response => {
      this.endereco = response; }, error => {console.log(error); } );
  }

  updateMilitarAndEndereco() {
    this.militaresService.update(this.militar, this.precCP).subscribe(response => {
      console.log('Militar editado com sucesso!'); } ,
      error => {console.log(error); } );
          this.militar = new MilitarDTO();
    this.enderecosService.update(this.endereco, this.endereco.id).subscribe(response => {
      console.log('Endereco editado com sucesso!'); } ,
      error => {console.log(error); } );
          this.endereco = new EnderecoDTO();
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

  getAdress() {
    this.enderecosService.findAdressByCEP(this.cep).subscribe( response => { this.endereco = response; },
      error => {console.log(error); });
  }
  cancelar() {
    this.router.navigate(['/index']);
  }

}// fecha classe
