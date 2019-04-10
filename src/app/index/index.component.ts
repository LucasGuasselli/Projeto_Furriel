import { Component, OnInit } from '@angular/core';
import { Aditamento } from '../aditamento';
import { CrudAditamentosService } from '../crud-aditamentos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  aditamentos: Aditamento[] = [];
  codAditamento: number = null;
  nome: string;


  constructor(private servico: CrudAditamentosService, private router: Router, private rota: ActivatedRoute ) { }

  ngOnInit() {
    this.aditamentos = this.servico.getAditamentosSemData();
  }

  salvarCodAditamento(codigo: number) {
    if (isNaN(codigo)) {
        alert('selecione um dos aditamentos disponiveis.');
    } else {
        this.codAditamento = codigo;
        for (let i = 0; i < this.aditamentos.length; i++) {
              // tslint:disable-next-line:triple-equals
              if (this.aditamentos[i].codAditamento == this.codAditamento) {
                this.nome = this.aditamentos[i].nome;
              }
        }
        console.log(codigo);
    }
  }

  salvarAditamentoAtual() {
    if (this.codAditamento == null) {
      alert('Voce precisa selecionar um aditamento!');
    } else {
      this.servico.salvarAditamentoAtual(this.codAditamento);
      this.codAditamento = null;
      alert('Aditamento selecionado com sucesso');
    }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
