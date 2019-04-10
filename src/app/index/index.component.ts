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
  codAditamento: number;

  constructor(private servico: CrudAditamentosService, private router: Router, private rota: ActivatedRoute ) { }

  ngOnInit() {
    this.aditamentos = this.servico.getAditamentosSemData();
  }

  salvarCodAditamento(codigo: number) {
    if (isNaN(codigo)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.codAditamento = codigo;
        console.log(this.codAditamento);
    }
  }

  salvarAditamentoAtual() {
      this.servico.salvarAditamentoAtual(this.codAditamento);
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
