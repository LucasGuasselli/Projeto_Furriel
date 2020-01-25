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

  aditamentoAtual: AditamentoDTO = null;
  saqueAtrasado: PagamentoAtrasadoDTO = new PagamentoAtrasadoDTO();
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  precCP: number;

  constructor(private militaresService: MilitaresService,
              private saquesAtrasadoService: PagamentosAtrasadosService,
              private router: Router, private rota: ActivatedRoute,
              private aditamentosService: AditamentosService) { }

    ngOnInit() {
      this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
        if ( this.aditamentoAtual == null)    {
          alert('Selecione um aditamento!');
            // redireciona para a pagina inicial
            this.router.navigate(['/index']);
        }
          this.loadMilitaresComAuxilioTransporte();
    }

    loadMilitaresComAuxilioTransporte() {
      this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
          response => {this.militaresComAuxilioTransporte = response;} , error => {console.log(error); } );
    }

    validatePrecCP() {
        if (isNaN(this.precCP)) {
            alert('Selecione um militar!');
        } else {
            this.beforeInsertSaqueAtrasado();
        }
    }

    beforeInsertSaqueAtrasado() {
      this.saqueAtrasado.militarPrecCP = this.precCP;
      this.saqueAtrasado.aditamentoId = this.aditamentoAtual.id;
        this.insertSaqueAtrasado();
    }

    insertSaqueAtrasado() {      
      this.saquesAtrasadoService.insert(this.saqueAtrasado).subscribe(response => {
        if (response.status == 201) {
          alert('Saque Atrasado cadastrado com sucesso!');
            this.saqueAtrasado = new PagamentoAtrasadoDTO();
        } }, error => {console.log(error); } );
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
