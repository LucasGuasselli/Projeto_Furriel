import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { MilitaresService } from '../services/militares.service';
import { MilitarDTO } from '../models/militar.dto';
import { EnderecoDTO } from '../models/endereco.dto';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css']
})
export class TabelaMilitaresComponent implements OnInit {

  titulo = 'Tabela de Militares';

  militares: MilitarDTO[] = [];
  enderecos: EnderecoDTO[] = [];

  constructor(private militaresService: MilitaresService, private enderecosService: EnderecosService) { }

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
