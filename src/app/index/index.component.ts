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
  aditamentoAtual: AditamentoDTO;

  constructor(private aditamentosService: AditamentosService,
              private router: Router,
              private rota: ActivatedRoute ) { }

  ngOnInit() {
    this.loadAditamentos();
  }

// CADASTRAR
  moveToFormMilitar() {
    this.router.navigate(['/cadastroMilitar']);
  }

  moveToFormAuxilioTransporte() {
    this.router.navigate(['/cadastroAT']);
  }

  moveToFormDesconto() {
    this.router.navigate(['/cadastroDesconto']);
  }

  moveToFormDescontoFeriadoAdm() {
    this.router.navigate(['/cadastroDescontoFeriadoAdm']);
  }

  moveToFormSaqueAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  moveToFormExclusaoAuxilioTransporte() {
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

moveToFormDescontoGuarnicao() {
  this.router.navigate(['/cadastroDescontoGuarnicao']);
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

// Passagens

moveToReadPassagens() {
  this.router.navigate(['/listaValoresPassagens']);
}

moveToFormPassagens() {
  this.router.navigate(['/cadastroPassagem']);
}

saveAditamento(aditamento: AditamentoDTO) {
  if (isNaN(aditamento.id)) {
      // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
  } else {
     this.aditamentoAtual = new AditamentoDTO;
     this.aditamentoAtual = aditamento;
       console.log(this.aditamentoAtual);
    }
  }

 loadAditamentos() {
   this.aditamentosService.findAll().subscribe( response => { this.aditamentos = response; },
     error => {console.log(error); });
 }

 saveAditamentoAtual() {
   this.aditamentosService.saveAditamentoAtual(this.aditamentoAtual);
     alert('Aditamento Salvo.');
 }

  cancel() {
    this.router.navigate(['/index']);
  }
}
