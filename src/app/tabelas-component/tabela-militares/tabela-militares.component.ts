import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MilitaresService } from '../../services/militares.service';
import { MilitarDTO } from '../../models/militar.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { EnderecosService } from '../../services/enderecos.service';


@Component({
  selector: 'app-tabela-militares',
  templateUrl: './tabela-militares.component.html',
  styleUrls: ['./tabela-militares.component.css']
})
export class TabelaMilitaresComponent implements OnInit {

  titulo = 'Tabela de Militares';

  militares: MilitarDTO[] = [];
  enderecos: EnderecoDTO[] = [];
  ELEMENT_DATA = this.militares;

  displayedColumns: string[] = ['nome', 'precCP', 'Editar', 'Remover'];
  dataSource;

  constructor(private militaresService: MilitaresService,
              private enderecosService: EnderecosService,
              private router: Router,
              private rota: ActivatedRoute) { }

  ngOnInit() {
      this.enderecosService.findAll().subscribe(response => {this.enderecos = response; } ,
          error => {console.log(error); } );
      this.militaresService.findAll().subscribe(response => { this.dataSource = response; this.militares  = response; } ,
          error => {console.log(error); } );
  }

  removerMilitar(militar: MilitarDTO) {
      this.militaresService.delete(militar).subscribe(response => { console.log('Militar deletado com sucesso!'); } ,
        error => {console.log(error); } );
      // deve ter alguns segundos entre o delete e o ngOnInit para dar tempo de receber a lista de militares atualizadas
      alert('Militar Deletado com sucesso!');
      this.ngOnInit();
  }

  cancel() {
    this.router.navigate(['/index']);
  }


}
