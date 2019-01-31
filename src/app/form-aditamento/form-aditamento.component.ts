import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudAditamentosService } from '../crud-aditamentos.service';
import { Aditamento } from '../aditamento';


@Component({
  selector: 'app-form-aditamento',
  templateUrl: './form-aditamento.component.html',
  styleUrls: ['./form-aditamento.component.css']
})
export class FormAditamentoComponent implements OnInit {

  aditamento: Aditamento;
  constructor(private servico: CrudAditamentosService, private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
      this.aditamento = new Aditamento();
  }

  salvarAditamento() {
      this.aditamento.data = null;
      this.servico.adicionarAditamento(this.aditamento);
      this.aditamento = new Aditamento();
  }
  // cancelando cadastro
  cancelar() {
    this.router.navigate(['/index']);
  }
}
