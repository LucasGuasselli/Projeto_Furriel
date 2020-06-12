import { Component, OnInit } from '@angular/core';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitarDTO } from '../../models/militar.dto';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecosService } from "../../services/enderecos.service";
// import { EnderecosService } from '../../services/enderecos.service';

@Component({
  selector: 'app-form-militares',
  templateUrl: './form-militares.component.html',
  styleUrls: ['./form-militares.component.css']
})
export class FormMilitaresComponent implements OnInit {
    titulo = 'Cadastro de Militares';

    militar: MilitarDTO = new MilitarDTO();
    militares: MilitarDTO[] = [];
    endereco: EnderecoDTO = new EnderecoDTO();
    postosGraduacoes: PostoGraduacaoDTO[] = [];
    precCP: number = null;
    cep: String;
    validatePostoGraduacaoId: number;

  constructor(private militaresService: MilitaresService,
              private enderecosService: EnderecosService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
    this.precCP = this.rota.snapshot.params['cod'];
    this.postosGraduacoesService.retornarTodos().subscribe(response => { this.postosGraduacoes = response; } ,
      error => {console.log(error); } 
    );
    this.militaresService.retornarTodos().subscribe(response => { this.militares = response; },
      error => { console.log(error); }
    );

    // casos de cadastro 
      if (isNaN(this.precCP)) {
        this.militar  = new MilitarDTO();
        this.endereco  = new EnderecoDTO();
      } else {
        // casos de edicao da entidade militar
          alert('O Prec-CP e a Graduação não devem ser alterados!');
          this.carregarMilitarEEndereco();
       // console.log(this.endereco.militarPrecCP);
      }
  }

  carregarMilitarEEndereco() {
    this.militaresService.retornarMilitarPorPrecCP(this.precCP).subscribe( response => {
      this.militar = response; this.validatePostoGraduacaoId = this.militar.postoGraduacaoId; }, error => {console.log(error); } );

    this.enderecosService.retornarEnderecoPorPrecCP(this.precCP).subscribe( response => {
      this.endereco = response; }, error => {console.log(error); } );
  }

  // salva  ou edita uma entidade militar e endereco
  validarMilitar() {
    if (isNaN(this.precCP)) {
      if(this.verificarPrecCPCadastrados(this.militar.precCP) == true) {      
          this.precCP = this.militar.precCP;
              // tslint:disable-next-line:triple-equals
              if (this.validarPrecCP() == true) {
                // fazendo com que "o endereco saiba a qual militar pertence"
                  this.endereco.militarPrecCP = this.militar.precCP;
                this.inserirMilitar();
                // redireciona para a lista
                    this.router.navigate(['/listaMilitares']);
              } else {
                // substituir por uma janela ou pop-up posteriormente
                  this.precCP = null;
                alert('valor inválido inserido no campo Prec-CP');
              }
      } else {
         alert('Você inseriu um Prec-CP já Cadastrado!');
      }
    } else {
      if( this.validatePostoGraduacaoId == this.militar.postoGraduacaoId) {
        console.log('chegou na edicao' + this.precCP);
          // fazendo com que "o endereco saiba a qual militar pertence"
          this.endereco.militarPrecCP = this.militar.precCP;
            this.atualizarMilitar();
            this.atualizarEndereco();
                this.router.navigate(['/listaMilitares']);
      } else {
        alert('Você NÃO pode alterar a graduação do militar!!');
      }        
    }
  }

  verificarPrecCPCadastrados(precCP: number) {
      for (let i = 0; i < this.militares.length; i++) {
        // se o precCP digitado for igual a de algum militar cadastrado, return FALSE
         if (this.militares[i].precCP == precCP) {
            return false;
         }

      }
         return true;
  }

  validarPrecCP() {
      if (Number.isInteger(this.militar.precCP)) {
        return true;
      } else {
        return false;
      }
  }

  inserirMilitar() {
    this.militaresService.inserir(this.militar).subscribe(response => {
          if (response.status == 201) { 
            this.inserirEndereco();  
            console.log('Militar cadastrado efetuado com sucesso!'); 
          } } ,
            error => { console.log(error); } 
          );
            this.militar = new MilitarDTO();
  }

  inserirEndereco() {
    this.enderecosService.inserir(this.endereco).subscribe(response => {
          if (response.status == 201) {
             console.log('Endereco cadastrado com sucesso!'); 
          } },
            error => {console.log(error); }
          );
              this.endereco = new EnderecoDTO();
  }  

  atualizarMilitar() {
    this.militaresService.editar(this.militar, this.precCP).subscribe(response => {
          if (response.status == 204) { 
            console.log('Militar editado com sucesso!');
          } },
            error => {console.log(error); }
          );
            this.militar = new MilitarDTO();    
  }

  atualizarEndereco() {
    this.enderecosService.atualizar(this.endereco, this.endereco.id).subscribe(response => {
          if (response.status == 204) {
             console.log('Endereco editado com sucesso!'); 
          } },
             error => {console.log(error); } 
          );
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

  retornarEndereco() {
    this.enderecosService.retornarEnderecoPorCEP(this.cep).subscribe( response => { this.endereco = response; },
       error => {console.log(error); });
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

} // fecha classe
