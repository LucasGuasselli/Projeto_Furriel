import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { CrudMilitaresService } from '../services/crud-militares.service';
import { MilitarDTO } from '../models/MilitarDTO';
import { EnderecoDTO } from '../models/EnderecoDTO';
import { EnderecosService } from '../services/Enderecos.service';

@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css']
})
export class TabelaMilitaresComponent implements OnInit {

  titulo = 'Tabela de Militares';

  militares: MilitarDTO[] = [];
  enderecos: EnderecoDTO[] = [];

  constructor(private militaresService: CrudMilitaresService, private enderecosService: EnderecosService) { }

  ngOnInit() {
      this.enderecosService.findAll().subscribe(response => {this.enderecos = response; } ,
          error => {console.log(error); } );
      this.militaresService.findAll().subscribe(response => {this.militares = response; } ,
          error => {console.log(error); } );
  }

  removerMilitar(militar: Militar) {
    // this.servico.removerMilitar(militar);
  }

}
