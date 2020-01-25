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
    this.loadPassagens();
  /* IF - cadastro ou quando o usuario insere um preccp invalido
     ELSE - serve para casos de edicao da entidade passagem */
  if (isNaN(this.id)) {
    this.passagem  = new PassagemDTO();
  } else {
      this.loadUpdatePassagem();
      // console.log(this.passagem.id);
    }

  }

  loadPassagens() {
      this.passagensService.findAll().subscribe(response => {this.passagens = response; }, error => {console.log(error); } );
  }


  loadUpdatePassagem() {
    this.passagensService.findPassagemById(this.id).subscribe( response => {
      this.passagem = response; }, error => {console.log(error); } );
  }

  validateForm() {
      if (this.passagem.tipoTransporte === null || this.passagem.valor < 0 || isNaN(this.passagem.valor)) {
          alert('Preencha os campos corretamente (Ex: \'Ônibus, R$ 4,70\')');
      } else if (this.id == null && this.validateTipoTransporte() === false) {
          alert('Tipo de passagem já cadastrado, por favor digite outro tipo.');
      } else {
        this.savePassagem();
      }
  }

   validateTipoTransporte() {
    for (let i = 0; i < this.passagens.length; i++) {
        if (this.passagens[i].tipoTransporte === this.passagem.tipoTransporte) {
          return false;
        }
    }
    return true;
  }

  // salva  ou edita uma entidade passagem no banco de dados
  savePassagem() {
    if (isNaN(this.id)) {
        this.insertPassagem();
          // redireciona para a lista
          this.router.navigate(['/listaValoresPassagens']);
    } else {
        // console.log('chegou na edicao' + this.id);
        this.updatePassagem(this.passagem);
          this.router.navigate(['/listaValoresPassagens']);
    }
  }  

  insertPassagem() {
    this.passagensService.insert(this.passagem).subscribe(response => { if (response.status === 201) {
      console.log('Passagem cadastrada com sucesso!'); } }, error => { console.log(error); });
  }

  updatePassagem(passagem: PassagemDTO) {
    this.passagensService.update(passagem, passagem.id).subscribe( response => { console.log(response);
        console.log('passagem editada com sucesso'); }, error => { console.log(error); } );
  }

  cancel() {
    this.router.navigate(['/index']);
  }

}
