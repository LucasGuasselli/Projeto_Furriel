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
        this.carregarTexto();
      } else {
          this.carregarAditamento();
      }
  }

  carregarAditamento( ) {
    this.aditamentosService.retornarPorId(this.id).subscribe(  response => { this.aditamento = response; },
      error => { console.log(error); });
  }

  // salva ou edita uma entidade aditamento
  validarAditamento() {
    // validar atributo nome
    if (this.aditamento.nome.length <= 3) {
      alert('Insira um nome para o aditamento com pelo menos 4 caracteres!');
    } else {
      // cadastrar se IF for TRUE e editar caso seja FALSE
      if (isNaN(this.id)) {
        this.inserirAditamento();
        // redireciona para a lista
            this.router.navigate(['/listaAditamento']);
      } else {
        console.log('Chegou na edicao' + this.id);
            this.atualizarAditamento();
                this.router.navigate(['/listaAditamento']);
      }
    }
  }

  inserirAditamento() {
      this.aditamentosService.inserir(this.aditamento).subscribe( response =>  { 
        if (response.status === 201) {
          console.log(response);
        }
     }, 
        error => {console.log(error); } 
     );
  }

  atualizarAditamento() {
    this.aditamentosService.editar(this.aditamento, this.id).subscribe(response => {
      if (response.status === 204) {
        console.log('Aditamento editado com sucesso!');
      }
    }, 
        error => {console.log(error); } 
    );
          this.aditamento = new AditamentoDTO();
  }

  carregarTexto() {
    this.aditamento.despesaPeriodo = 'referente as publicações em Boletim no período compreendido de 16 de Abril a 15 de Maio de 2019';
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}
