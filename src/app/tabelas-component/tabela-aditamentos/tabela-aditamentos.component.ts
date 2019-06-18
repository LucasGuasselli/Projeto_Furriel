import { Component, OnInit } from '@angular/core';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';

@Component({
  selector: 'app-tabela-aditamentos',
  templateUrl: './tabela-aditamentos.component.html',
  styleUrls: ['./tabela-aditamentos.component.css']
})
export class TabelaAditamentosComponent implements OnInit {

  aditamentos: AditamentoDTO[] = [];
  constructor(private aditamentosService: AditamentosService) { }

  ngOnInit() {
      this.aditamentosService.findAll().subscribe( response => {this.aditamentos = response; },
       error => { console.log(error); });
  }

}
