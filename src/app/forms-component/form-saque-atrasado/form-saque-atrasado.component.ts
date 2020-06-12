import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitaresService } from '../../services/militares.service';
import { SaquesAtrasadosService } from '../../services/saquesAtrasados.service';
import { SaqueAtrasadoDTO } from '../../models/saqueAtrasado.dto';
import { MilitarDTO } from '../../models/militar.dto';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';

@Component({
  selector: 'app-form-saque-atrasado',
  templateUrl: './form-saque-atrasado.component.html',
  styleUrls: ['./form-saque-atrasado.component.css']
})
export class FormSaqueAtrasadoComponent implements OnInit {

  aditamentoAtual: AditamentoDTO = null;
  saqueAtrasado: SaqueAtrasadoDTO = new SaqueAtrasadoDTO();
  militaresComAuxilioTransporte: MilitarDTO[] = [];
  precCP: number;

  constructor(private militaresService: MilitaresService,
              private saquesAtrasadoService: SaquesAtrasadosService,
              private router: Router, private rota: ActivatedRoute,
              private aditamentosService: AditamentosService) { }

    ngOnInit() {
      this.aditamentoAtual = this.aditamentosService.retornarAditamentoAtual();
        if ( this.aditamentoAtual == null)    {
          alert('Selecione um aditamento!');
            // redireciona para a pagina inicial
            this.router.navigate(['/index']);
        }
          this.carregarMilitaresComAuxilioTransporte();
    }

    carregarMilitaresComAuxilioTransporte() {
      this.militaresService.retornarMilitaresComAuxilioTransporte().subscribe(
          response => {this.militaresComAuxilioTransporte = response;} , error => {console.log(error); } );
    }

    validarPrecCP() {
        if (isNaN(this.precCP)) {
            alert('Selecione um militar!');
        } else {
            this.prepararSaqueAtrasado();
        }
    }

    prepararSaqueAtrasado() {
      this.saqueAtrasado.militarPrecCP = this.precCP;
      this.saqueAtrasado.aditamentoId = this.aditamentoAtual.id;
        this.inserirSaqueAtrasado();
    }

    inserirSaqueAtrasado() {      
      this.saquesAtrasadoService.inserir(this.saqueAtrasado).subscribe(response => {
        if (response.status == 201) {
          alert('Saque Atrasado cadastrado com sucesso!');
            this.saqueAtrasado = new SaqueAtrasadoDTO();
        } }, error => {console.log(error); } );
    }    

    salvarMilitarPrecCP(codigo: number) {
      if (isNaN(codigo)) {
          // CRIAR CAMINHO ONDE NAO POSSA SALVAR UM MILITAR SEM POSTO
      } else {
          this.precCP = codigo;
      }
    }

    cancelar() {
      this.router.navigate(['/index']);
    }
}
