import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentoDTO } from '../models/aditamento.dto';
import { AditamentosService } from '../services/aditamentos.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  aditamentos: AditamentoDTO[] = [];
  aditamentoId: number;

  constructor(private aditamentosService: AditamentosService,
              private router: Router,
              private rota: ActivatedRoute ) { }

  ngOnInit() {
    this.loadAditamentos();
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

  saveAditamentoId(id: number) {
    if (isNaN(id)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.aditamentoId = id;
        console.log(this.aditamentoId);
    }
  }

  loadAditamentos() {
    this.aditamentosService.findAll().subscribe( response => { this.aditamentos = response; },
       error => {console.log(error); });
  }

  saveAditamentoAtualId() {
      this.aditamentosService.saveAditamentoAtualId(this.aditamentoId);
      alert('Aditamento Salvo.');
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
