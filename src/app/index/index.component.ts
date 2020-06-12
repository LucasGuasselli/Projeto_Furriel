import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentoDTO } from '../models/aditamento.dto';
import { AditamentosService } from '../services/aditamentos.service';
import { DateAdapter } from "@angular/material/core";

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
              private rota: ActivatedRoute,
              private adapter: DateAdapter<any> ) { }

  ngOnInit() {
    this.carregarAditamentos();
    this.adapter.setLocale('bra');

  }

// CADASTRAR
  moverParaFormMilitar() {
    this.router.navigate(['/cadastroMilitar']);
  }

  moverParaFormAuxilioTransporte() {
    this.router.navigate(['/cadastroAT']);
  }

  moverParaFormDespesa() {
    this.router.navigate(['/cadastroDespesa']);
  }

  moverParaFormDespesaGuarnicao() {
    this.router.navigate(['/cadastroDespesasGuarnicao']);
  }

  moverParaFormDespesaFeriadoAdm() {
    this.router.navigate(['/cadastroDespesaFeriadoAdm']);
  }

  moverParaFormSaqueAtrasado() {
    this.router.navigate(['/cadastroPagamentoAtrasado']);
  }

  moverParaFormExclusaoAuxilioTransporte() {
    this.router.navigate(['/cadastroExclusaoAuxilioTransporte']);
  }

// LISTAR
moverParaListaMilitares() {
  this.router.navigate(['/listaMilitares']);
}

moverParaListaAuxiliosAndConducoes() {
  this.router.navigate(['/listaATConducao']);
}

moverParaListaDescontos() {
  this.router.navigate(['/listaDespesas']);
}

moverParaListaPagamentosAtrasados() {
  this.router.navigate(['/listaPagamentoAtrasado']);
}

moverParaListaExclusoesAuxilioTransporte() {
  this.router.navigate(['/listaExclusaoAuxiliosTransporte']);
}

// ADITAMENTO
moverParaAditamentoPDF() {
  this.router.navigate(['/relatorio']);
}

moverParaFormAditamento() {
  this.router.navigate(['/cadastroAditamento']);
}

moverParaListaAditamento() {
  this.router.navigate(['/listaAditamento']);
}

// Passagens

moverParaListaPassagens() {
  this.router.navigate(['/listaValoresPassagens']);
}

moverParaFormPassagens() {
  this.router.navigate(['/cadastroPassagem']);
}

salvarAditamento(aditamento: AditamentoDTO) {
  if (isNaN(aditamento.id)) {
      // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
  } else {
     this.aditamentoAtual = new AditamentoDTO;
     this.aditamentoAtual = aditamento;
       console.log(this.aditamentoAtual);
    }
  }

 carregarAditamentos() {
   this.aditamentosService.retornarTodos().subscribe( response => { this.aditamentos = response; },
     error => {console.log(error); });
 }

 salvarAditamentoAtual() {
   this.aditamentosService.salvarAditamentoAtual(this.aditamentoAtual);
     alert('Aditamento Salvo.');
 }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
