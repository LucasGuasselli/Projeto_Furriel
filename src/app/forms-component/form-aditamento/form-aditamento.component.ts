import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';


@Component({
  selector: 'app-form-aditamento',
  templateUrl: './form-aditamento.component.html',
  styleUrls: ['./form-aditamento.component.css']
})
export class FormAditamentoComponent implements OnInit {

  aditamento: AditamentoDTO = new AditamentoDTO();
  constructor(private aditamentosService: AditamentosService,
              private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
    this.loadText();
  }

  saveAditamento() {
      this.aditamentosService.insert(this.aditamento).subscribe( response =>  { if (response.status === 201) {}
     console.log(response); },  error => {console.log(error); } );
  }

  loadText() {
    this.aditamento.despesaPeriodo = 'referente as publicações em Boletim no período compreendido de 16 de Abril a 15 de Maio de 2019';

    this.aditamento.exclusaoTexto = 'Seja cancelado o benefício do AT de acordo com o Art. 11. das Instruções Reguladoras ' +
    'para a Concessão do Auxílio-Transporte no Exército Brasileiro (IR 70-21).';
  }

  cancel() {
    this.router.navigate(['/index']);
  }

}
