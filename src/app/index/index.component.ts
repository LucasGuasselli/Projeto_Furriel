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
// CADASTRAR
  moveToSaveMilitar() {
    this.router.navigate(['/cadastroDeMilitar']);
  }

  moveToSaveAuxilioTransporte() {
    this.router.navigate(['/cadastroDeAT']);
  }

  moveToSaveDesconto() {
    this.router.navigate(['/cadastroDeDesconto']);
  }

  moveToSaveSaqueAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  moveToSaveExclusaoAuxilioTransporte() {
    this.router.navigate(['/cadastroExclusaoAuxilioTransporte']);
  }

// LISTAR
moveToReadMilitares() {
  this.router.navigate(['/listaMilitares']);
}

moveToReadAuxiliosAndConducoes() {
  this.router.navigate(['/listaATConducao']);
}

moveToReadDescontos() {
  this.router.navigate(['/listaDesconto']);
}

moveToReadPagamentosAtrasados() {
  this.router.navigate(['/listaPagamentoAtrasado']);

}

moveToReadExclusoesAuxilioTransporte() {
  this.router.navigate(['/listaExclusaoAuxiliosTransporte']);

}

// ADITAMENTO
  moveToAditamentoPDF() {
    this.router.navigate(['/relatorio']);
  }

  moveFormAditamento() {
    this.router.navigate(['/cadastroAditamento']);
  }

  moveToReadAditamento() {
    this.router.navigate(['/listaAditamento']);
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
      alert('Aditamento Salvo.');
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
