import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-desconto-guarnicao-servico',
  templateUrl: './form-desconto-guarnicao-servico.component.html',
  styleUrls: ['./form-desconto-guarnicao-servico.component.css']
})
export class FormDescontoGuarnicaoServicoComponent implements OnInit {

  militaresComAuxilioTransporte: MilitarDTO[] = [];
  sargentosDeDia: MilitarDTO[] = [];
  cabosDeDia: MilitarDTO[] = [];
  plantoes: MilitarDTO[] = [];
  aditamentoAtual: AditamentoDTO;

  constructor(private militaresService: MilitaresService,
              private aditamentosService: AditamentosService,
              private router: Router) { }

  ngOnInit() {
    this.aditamentoAtual = this.aditamentosService.getAditamentoAtual();
      if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
        this.router.navigate(['/index']);
      }
    this.loadMilitaresComAuxilioTransporte();
  }

  loadMilitaresComAuxilioTransporte() {
    this.militaresService.findMilitaresComAuxilioTransporte().subscribe(
        response => {this.militaresComAuxilioTransporte = response; this.splitMilitares(this.militaresComAuxilioTransporte);
        console.log(this.militaresComAuxilioTransporte); } ,
          error => {console.log(error); } );
  }

  // separa os militares por graduacao
  splitMilitares(militares: MilitarDTO[]) {
      for (let i = 0; i < militares.length; i++) {
        // 2º e 3º Sargentos sao da escala de sargento de dia
          if (militares[i].postoGraduacaoId === 5 || militares[i].postoGraduacaoId === 4 ) {
              this.sargentosDeDia.push(militares[i]);
          }
          if (militares[i].postoGraduacaoId === 3 ) {
            this.cabosDeDia.push(militares[i]);
          }
          if (militares[i].postoGraduacaoId === 2 || militares[i].postoGraduacaoId === 1 ) {
            this.plantoes.push(militares[i]);
          }
      }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}
