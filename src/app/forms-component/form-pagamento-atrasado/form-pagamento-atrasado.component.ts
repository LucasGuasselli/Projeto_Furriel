import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitaresService } from '../../services/militares.service';
import { PagamentosAtrasadosService } from '../../services/pagamentosAtrasados.service';
import { PagamentoAtrasadoDTO } from '../../models/pagamentoAtrasado.dto';
import { MilitarDTO } from '../../models/militar.dto';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';

@Component({
  selector: 'app-form-pagamento-atrasado',
  templateUrl: './form-pagamento-atrasado.component.html',
  styleUrls: ['./form-pagamento-atrasado.component.css']
})
export class FormPagamentoAtrasadoComponent implements OnInit {

  precCP: number;
  pagamentoAtrasado: PagamentoAtrasadoDTO = new PagamentoAtrasadoDTO();
  militaresComAuxilioTransporte: MilitarDTO[] = [];

  aditamentoAtual: AditamentoDTO = null;

  constructor(private militaresService: MilitaresService,
              private pagamentoAtrasadoService: PagamentosAtrasadosService,
              private router: Router, private rota: ActivatedRoute,
              private aditamentosService: AditamentosService) { }

    ngOnInit() {
      this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
        this.router.navigate(['/index']);
      }
        this.loadMilitaresComAuxilioTransporte();
    }

    savePagamentoAtrasado() {
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
      } else {
        if (isNaN(this.precCP)) {
            alert('Selecione um militar!');
        } else {
            this.insertPagamentoAtrasado();
        }
      }
    }

    insertPagamentoAtrasado() {
      this.pagamentoAtrasado.militarPrecCP = this.precCP;
      this.pagamentoAtrasado.aditamentoId = this.aditamentoAtual.id;
      this.pagamentoAtrasadoService.insert(this.pagamentoAtrasado).subscribe(response => {
        console.log(response); alert('Saque Atrasado cadastrado com sucesso!'); }, error => {console.log(error); } );
    }

    loadMilitaresComAuxilioTransporte() {
      this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
          response => {this.militaresComAuxilioTransporte = response; console.log(this.militaresComAuxilioTransporte); } ,
          error => {console.log(error); } );
    }

    saveMilitarPrecCP(codigo: number) {
      if (isNaN(codigo)) {
          // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
      } else {
          this.precCP = codigo;
      }
    }

    cancel() {
      this.router.navigate(['/index']);
    }
}
