import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagamentoAtrasado } from '../../pagamento-atrasado';
import { CrudPagamentoAtrasadoService } from '../../crud-pagamento-atrasado.service';
import { Militar } from '../../militar';
import { MilitaresService } from '../../services/militares.service';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';

@Component({
  selector: 'app-form-pagamento-atrasado',
  templateUrl: './form-pagamento-atrasado.component.html',
  styleUrls: ['./form-pagamento-atrasado.component.css']
})
export class FormPagamentoAtrasadoComponent implements OnInit {

  codigo: number;
  precCP: number;
  aditamentoAtual: Aditamento;
  pagamentoAtrasado: PagamentoAtrasado;
  pagamentosAtrasados: PagamentoAtrasado[] = [];
  militares: Militar[] = [];

  constructor(private servicoCrudMilitares: MilitaresService, private servicoCrudPagamentoAtrasado: CrudPagamentoAtrasadoService,
              private router: Router, private rota: ActivatedRoute, private servicoCrudAditamento: CrudAditamentosService) { }

    ngOnInit() {

      if (isNaN(this.codigo)) {
        // CADASTRAR
        this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();
        this.militares = this.servicoCrudMilitares.getMilitares();
        this.pagamentoAtrasado  = new PagamentoAtrasado();
        this.pagamentoAtrasado.precCP = null;
      } else {
        // EDITAR
      }
    }

    salvarPrecCP(codigo: number) {
      if (isNaN(codigo)) {
          // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
      } else {
          this.pagamentoAtrasado.codAditamento = this.aditamentoAtual.codAditamento;
          this.pagamentoAtrasado.precCP = codigo;
          console.log(codigo);
      }
    }

    salvarPagamentoAtrasado() {
      if (isNaN(this.precCP)) {
        this.servicoCrudPagamentoAtrasado.adiocionarPagamentoAtrasado(this.pagamentoAtrasado);
        this.pagamentoAtrasado = new PagamentoAtrasado();
      } else {
        this.servicoCrudPagamentoAtrasado.atualizaPagamentoAtrasado(this.codigo, this.pagamentoAtrasado);
      }
      this.router.navigate(['/listaPagamentoAtrasado']);
    }

      removerPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasado) {
        this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
      }

      cancelar() {
        this.router.navigate(['/index']);
      }
}
