import { Component, OnInit } from '@angular/core';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-aditamentos',
  templateUrl: './tabela-aditamentos.component.html',
  styleUrls: ['./tabela-aditamentos.component.css']
})
export class TabelaAditamentosComponent implements OnInit {

  aditamentos: AditamentoDTO[] = [];
  displayedColumns: string[] = ['nome', 'data'];

  constructor(private aditamentosService: AditamentosService,
              private router: Router) { }

  ngOnInit() {
      this.aditamentosService.findAll().subscribe( response => {this.aditamentos = response; },
       error => { console.log(error); });
  }

  moveToFormAditamento() {
    this.router.navigate(['/cadastroAditamento']);
  }

  moveToIndex() {
    this.router.navigate(['/index']);
  }

}
