import { Component, OnInit } from '@angular/core';
import { PagamentoAtrasadoDTO } from '../../models/pagamentoAtrasado.dto';
import { PagamentosAtrasadosService } from '../../services/pagamentosAtrasados.service';

@Component({
  selector: 'app-tabela-pagamentos-atrasados',
  templateUrl: './tabela-pagamentos-atrasados.component.html',
  styleUrls: ['./tabela-pagamentos-atrasados.component.css']
})
export class TabelaPagamentosAtrasadosComponent implements OnInit {

  pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];
  constructor(private PagamentoAtrasadoService: PagamentosAtrasadosService) { }

  ngOnInit() {
      // this.pagamentosAtrasados = this.servicoCrudPagamentoAtrasado.getPagamentosAtrasados();
  }

  removerPagamentoAtrasado(pagamentoAtrasado: PagamentoAtrasadoDTO) {
   // this.servicoCrudPagamentoAtrasado.removerPagamentoAtrasado(pagamentoAtrasado);
  }
}
