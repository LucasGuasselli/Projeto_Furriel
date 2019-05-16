import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
import { CrudMilitaresService } from '../crud-militares.service';

@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css']
})
export class TabelaMilitaresComponent implements OnInit {

  titulo = 'Tabela de Militares';

  militares: Militar[] = [];
  enderecos: Endereco[] = [];

  constructor(private servico: CrudMilitaresService) { }

  ngOnInit() {
      this.militares = this.servico.getMilitares();
      this.enderecos = this.servico.getEnderecos();
      this.servico.findAll().subscribe(response => {
        console.log(response);
      });
  }

  removerMilitar(militar: Militar) {
    this.servico.removerMilitar(militar);
  }

}
