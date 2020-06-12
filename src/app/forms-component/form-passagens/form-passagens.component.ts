import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PassagemDTO } from '../../models/Passagem.dto';
import { PassagensService } from '../../services/passagens.service';

@Component({
  selector: 'app-form-passagens',
  templateUrl: './form-passagens.component.html',
  styleUrls: ['./form-passagens.component.css']
})
export class FormPassagensComponent implements OnInit {

  passagem: PassagemDTO = new PassagemDTO();
  passagens: PassagemDTO[] = [];
  id: number = null;

  constructor(private router: Router,
              private rota: ActivatedRoute,
              private passagensService: PassagensService) { }

  ngOnInit() {
    this.id = this.rota.snapshot.params['cod'];
    this.carregarPassagens();
  /* IF - cadastro ou quando o usuario insere um preccp invalido
     ELSE - serve para casos de edicao da entidade passagem */
  if (isNaN(this.id)) {
    this.passagem  = new PassagemDTO();
  } else {
      this.carregarPassagem();
      // console.log(this.passagem.id);
    }

  }

  carregarPassagens() {
      this.passagensService.retornarTodos().subscribe(response => {this.passagens = response; }, error => {console.log(error); } );
  }


  carregarPassagem() {
    this.passagensService.retornarPassagemPorId(this.id).subscribe( response => {
      this.passagem = response; }, error => {console.log(error); } );
  }

  validarForm() {
      if (this.passagem.tipoTransporte === null || this.passagem.valor < 0 || isNaN(this.passagem.valor)) {
          alert('Preencha os campos corretamente (Ex: \'Ônibus, R$ 4,70\')');
      } else if (this.id == null && this.validarTipoTransporte() === false) {
          alert('Tipo de passagem já cadastrado, por favor digite outro tipo.');
      } else {
        this.salvarPassagem();
      }
  }

   validarTipoTransporte() {
    for (let i = 0; i < this.passagens.length; i++) {
        if (this.passagens[i].tipoTransporte === this.passagem.tipoTransporte) {
          return false;
        }
    }
    return true;
  }

  // salva  ou edita uma entidade passagem no banco de dados
  salvarPassagem() {
    if (isNaN(this.id)) {
        this.inserirPassagem();
          // redireciona para a lista
          this.router.navigate(['/listaValoresPassagens']);
    } else {
        // console.log('chegou na edicao' + this.id);
        this.atualizarPassagem(this.passagem);
          this.router.navigate(['/listaValoresPassagens']);
    }
  }  

  inserirPassagem() {
    this.passagensService.inserir(this.passagem).subscribe(response => { if (response.status === 201) {
      console.log('Passagem cadastrada com sucesso!'); } }, error => { console.log(error); });
  }

  atualizarPassagem(passagem: PassagemDTO) {
    this.passagensService.editar(passagem, passagem.id).subscribe( response => { console.log(response);
        console.log('passagem editada com sucesso'); }, error => { console.log(error); } );
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}
