import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitaresService } from '../../services/militares.service';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { PagamentosAtrasadosService } from '../../services/pagamentosAtrasados.service';
import { PagamentoAtrasadoDTO } from '../../models/pagamentoAtrasado.dto';
import { MilitarDTO } from '../../models/militar.dto';

@Component({
  selector: 'app-form-pagamento-atrasado',
  templateUrl: './form-pagamento-atrasado.component.html',
  styleUrls: ['./form-pagamento-atrasado.component.css']
})
export class FormPagamentoAtrasadoComponent implements OnInit {

  precCP: number;
  aditamentoAtual: Aditamento;
  pagamentoAtrasado: PagamentoAtrasadoDTO = new PagamentoAtrasadoDTO();
 // pagamentosAtrasados: PagamentoAtrasadoDTO[] = [];
  militaresComAuxilioTransporte: MilitarDTO[] = [];

  constructor(private militaresService: MilitaresService,
              private pagamentoAtrasadoService: PagamentosAtrasadosService,
              private router: Router, private rota: ActivatedRoute,
              private servicoCrudAditamento: CrudAditamentosService) { }

    ngOnInit() {
        this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();
        this.loadMilitaresComAuxilioTransporte();

        if ( this.aditamentoAtual == null)    {
          alert('Selecione um aditamento!');
        }
    }

    savePagamentoAtrasado() {
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
      } else {
        if (isNaN(this.precCP)) {
            alert('selecione um militar!');
        } else {
            this.insertPagamentoAtrasado();

        }
      }
    }

    insertPagamentoAtrasado() {
      this.pagamentoAtrasado.militarPrecCP = this.precCP;
      this.pagamentoAtrasado.aditamentoId = this.aditamentoAtual.codAditamento;
      this.pagamentoAtrasadoService.insert(this.pagamentoAtrasado).subscribe(response => {
        console.log(response); }, error => {console.log(error); } );
    }

    loadMilitaresComAuxilioTransporte() {
      this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
          response => {this.militaresComAuxilioTransporte = response; console.log(this.militaresComAuxilioTransporte); } ,
          error => {console.log(error); } );
    }

    salvarPrecCP(codigo: number) {
      if (isNaN(codigo)) {
          // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
      } else {
         // this.pagamentoAtrasado.codAditamento = this.aditamentoAtual.codAditamento;
          this.precCP = codigo;
      }
    }

    cancelar() {
      this.router.navigate(['/index']);
    }
}
