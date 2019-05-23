import { Component, OnInit } from '@angular/core';
import { Aditamento } from '../../aditamento';
import { CrudAditamentosService } from '../../crud-aditamentos.service';

@Component({
  selector: 'app-tabela-aditamentos',
  templateUrl: './tabela-aditamentos.component.html',
  styleUrls: ['./tabela-aditamentos.component.css']
})
export class TabelaAditamentosComponent implements OnInit {

  aditamentos: Aditamento[] = [];
  constructor(private service: CrudAditamentosService) { }

  ngOnInit() {
      this.aditamentos = this.service.getAditamentos();
  }

}
