import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Aditamento } from '../../aditamento';
import { AditamentosService } from '../../services/aditamentos.service';


@Component({
  selector: 'app-form-aditamento',
  templateUrl: './form-aditamento.component.html',
  styleUrls: ['./form-aditamento.component.css']
})
export class FormAditamentoComponent implements OnInit {

  aditamento: Aditamento;
  constructor(private aditamentosService: AditamentosService,
              private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
      this.aditamento = new Aditamento();
  }

  salvarAditamento() {
      this.aditamento.data = null;
      // this.servico.adicionarAditamento(this.aditamento);
      this.aditamento = new Aditamento();
  }

  cancelar() {
    this.router.navigate(['/index']);
  }
}
