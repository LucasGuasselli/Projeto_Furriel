import { Component, OnInit } from '@angular/core';
import { Militar } from "../militar";
import { CrudMilitaresService } from "../crud-militares.service";

@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css']
})
export class TabelaMilitaresComponent implements OnInit {
  
  titulo = 'Tabela de Militares';
 
  militares:Militar[]=[];

  constructor(private servico:CrudMilitaresService) { }

  ngOnInit() {
      this.militares = this.servico.getMilitares();
  }

//remove um militar do array
  removerMilitar(militar:Militar){
    this.servico.removerMilitar(militar);
  }

}
