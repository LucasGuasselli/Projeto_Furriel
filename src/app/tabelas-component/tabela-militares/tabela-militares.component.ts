import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecosService } from '../../services/enderecos.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TabelaMilitaresComponent implements OnInit {

  titulo = 'Tabela de Militares';

  militares: MilitarDTO[] = [];
  enderecos: EnderecoDTO[] = [];
  ELEMENT_DATA = this.militares;

  displayedColumns = ['nome', 'precCP', 'editar'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private militaresService: MilitaresService,
              private enderecosService: EnderecosService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
      this.carregarMilitares();
  }

  carregarMilitares() {
    this.militaresService.retornarTodos().subscribe(
      response => { 
       // this.dataSource = new MatTableDataSource(response);
        this.militares  = response;
          this.carregarEnderecos(this.militares);         
      },
      error => { console.log(error); } 
    );
  }

  carregarEnderecos(militares: MilitarDTO[]) {
    this.enderecosService.retornarTodos().subscribe(
      response => {
        this.enderecos = response; 
        console.log(response); 
        this.atribuirEnderecos(militares, response); },
      error => { console.log(error); } );
  }

  atribuirEnderecos(militares: MilitarDTO[], enderecos: EnderecoDTO[]) {
      // atribui o endereco ao militar correspondente
      for(let i = 0; i < militares.length; i++) {
        for(let k = 0; k < enderecos.length; k++) {
            if (militares[i].precCP == enderecos[k].militarPrecCP) {
                  militares[i].endereco = enderecos[k];
                  console.log(militares[i].endereco);
            }
        }
      }
             this.carregarTabela(militares);
  }

  carregarTabela(militares: MilitarDTO[]) {
     this.dataSource = new MatTableDataSource(militares);
  }
  
  removerMilitar(militar: MilitarDTO) {
      this.militaresService.deletar(militar).subscribe(
        response => { 
          if (response.status == 204) { console.log('Militar deletado com sucesso!'); } 
        },
        error => {console.log(error); } 
      );
      // deve ter alguns segundos entre o delete e o ngOnInit para dar tempo de receber a lista de militares atualizadas
        alert('Militar Deletado com sucesso!');
          this.ngOnInit();
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

}


