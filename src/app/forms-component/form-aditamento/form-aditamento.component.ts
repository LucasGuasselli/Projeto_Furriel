import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';


@Component({
  selector: 'app-form-aditamento',
  templateUrl: './form-aditamento.component.html',
  styleUrls: ['./form-aditamento.component.css']
})
export class FormAditamentoComponent implements OnInit {

  aditamento: AditamentoDTO = new AditamentoDTO();
  id: number;
  constructor(private aditamentosService: AditamentosService,
              private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.rota.snapshot.params['cod'];

  /* IF - cadastro caso if for verdadeiro
    ELSE - serve para casos de edicao da entidade aditamento */
  if (isNaN(this.id)) {
    this.aditamento  = new AditamentoDTO();
    this.loadText();
  } else {
      this.loadAditamentoForUpdate();
      // console.log(this.aditamento);
    }
  }

   // salva ou edita uma entidade aditamento
   saveAditamento() {
    // validar atributo nome
    if (this.aditamento.nome.length <= 3) {
      alert('Insira um nome para o aditamento com pelo menos 4 caracteres!');
    } else {
      // cadastrar se IF for TRUE e editar caso seja FALSE
      if (isNaN(this.id)) {
        this.insertAditamento();
        // redireciona para a lista
            this.router.navigate(['/listaAditamento']);
      } else {
        console.log('Chegou na edicao' + this.id);
            this.updateAditamento();
                this.router.navigate(['/listaAditamento']);
      }
    }
  }

updateAditamento() {
  this.aditamentosService.update(this.aditamento, this.id).subscribe(response => {
    console.log('Aditamento editado com sucesso!'); } , error => {console.log(error); } );
        this.aditamento = new AditamentoDTO();
}

loadAditamentoForUpdate( ) {
  this.aditamentosService.findById(this.id).subscribe(  response => { this.aditamento = response; },
    error => { console.log(error); });
}

insertAditamento() {
    this.aditamentosService.insert(this.aditamento).subscribe( response =>  { if (response.status === 201) {}
   console.log(response); },  error => {console.log(error); } );
}

  loadText() {
    this.aditamento.despesaPeriodo = 'referente as publicações em Boletim no período compreendido de 16 de Abril a 15 de Maio de 2019';
  }

  cancel() {
    this.router.navigate(['/index']);
  }

}
