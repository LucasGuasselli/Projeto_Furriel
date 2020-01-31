import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassagensService } from '../../services/passagens.service';
import { PassagemDTO } from '../../models/Passagem.dto';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tabela-passagens',
  templateUrl: './tabela-passagens.component.html',
  styleUrls: ['./tabela-passagens.component.css']
})
export class TabelaValoresPassagensComponent implements OnInit {

  displayedColumns: string[] = ['tipoTransporte', 'valor', 'editar', 'remover'];
  dataSource;
  passagens: PassagemDTO[] = [];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private passagensService: PassagensService,
              private router: Router) { }

  ngOnInit() {
    this.loadPassagens();
  }

  loadPassagens() {
      this.passagensService.findAll().subscribe( response => { this.dataSource = new MatTableDataSource(response);
        }, error => { console.log(error); } );
  }

  removePassagem(passagem: PassagemDTO) {
      this.passagensService.delete(passagem).subscribe( 
        response => { 
          if (response.status === 204) { this.ngOnInit(); } },
        error => { console.log(error); }
      );
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
