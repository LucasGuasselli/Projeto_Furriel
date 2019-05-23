import { Component, OnInit } from '@angular/core';
import { DespesaDTO } from '../../models/despesa.dto';
import { DespesasService } from '../../services/despesas.service';
import { MilitarDTO } from '../../models/militar.dto';
import { MilitaresService } from '../../services/militares.service';

@Component({
  selector: 'app-tabela-descontos',
  templateUrl: './tabela-descontos.component.html',
  styleUrls: ['./tabela-descontos.component.css']
})
export class TabelaDescontosComponent implements OnInit {

  despesas: DespesaDTO[] = [];
  militar: MilitarDTO;
  militarPrecCP: number;

  constructor(private despesasService: DespesasService,
              private militaresService: MilitaresService) { }

  ngOnInit() {

    this.despesasService.findPrecCPById(1).subscribe(response => {this.despesas.push(response) ; } ,
      error => {console.log(error); } );

    // this.despesas[0].nome = 'Lucas';
      console.log(this.despesas[0]);
    /*this.militaresService.findMilitarByPrecCP(this.despesas[0].militarPrecCP).subscribe(
      response => {console.log(response) ; }, error => {console.log(error); }
    );*/
    // this.descontos = this.servicoCrudAT.getDescontos();

      for (let i = 0; i < this.despesas.length; i++) {
          console.log(this.despesas[i]);
      }
  }
}
