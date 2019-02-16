import { Component, OnInit } from '@angular/core';
import { PagamentoAtrasado } from '../pagamento-atrasado';
import { CrudPagamentoAtrasadoService } from '../crud-pagamento-atrasado.service';

@Component({
  selector: 'app-tabela-pagamentos-atrasados',
  templateUrl: './tabela-pagamentos-atrasados.component.html',
  styleUrls: ['./tabela-pagamentos-atrasados.component.css']
})
export class TabelaPagamentosAtrasadosComponent implements OnInit {

  pagamentosAtrasados: PagamentoAtrasado[] = [];
  constructor(private servicoCrudPagamentoAtrasado: CrudPagamentoAtrasadoService) { }

  ngOnInit() {
      this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
  }

  removerPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasado) {
    this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
  }
}
