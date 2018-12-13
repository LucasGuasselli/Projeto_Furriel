import { Component, OnInit } from '@angular/core';
import { AuxilioTransporte } from '../auxilio-transporte';
import { Militar } from '../militar';
import { CrudMilitaresService } from '../crud-militares.service';
import { CrudAuxilioTransporteService } from '../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Desconto } from '../desconto';

@Component({
  selector: 'app-form-descontos',
  templateUrl: './form-descontos.component.html',
  styleUrls: ['./form-descontos.component.css']
})
export class FormDescontosComponent implements OnInit {

  // objetos
    desconto = new Desconto();
    AT: AuxilioTransporte = new AuxilioTransporte();
    auxilioTransporte: AuxilioTransporte[] = [];
    militar: Militar[] = [];

  // codigos
    codMilitar: number;
    codAT: number;

  constructor(private servicoCrudMilitares: CrudMilitaresService, private servicoCrudAT: CrudAuxilioTransporteService,
              private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
      this.auxilioTransporte = this.servicoCrudAT.getAT();
      this.militar = this.servicoCrudMilitares.getMilitares();

      if (isNaN(this.codMilitar)) {
        // CADASTRAR
        this.desconto  = new Desconto();
      } else {
        // EDITAR
        // this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
        // this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));
      }
  }

  salvarDesconto() {
    if (isNaN(this.codMilitar)) {
      // tratar o erro
    } else {
      this.desconto.codMilitar = this.codMilitar;
      this.servicoCrudAT.adicionarDesconto(this.desconto);
      this.desconto = new Desconto();
    }
}

  salvarCodMilitar(codigo: number) {
    if (isNaN(codigo)) {
        // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
    } else {
        this.codMilitar = codigo;
        console.log(this.codMilitar);
    }
  }
  // cancelando cadastro
  cancelar() {
    this.router.navigate(['/index']);
  }
}
