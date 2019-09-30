import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassagensService } from '../../services/passagens.service';
import { PassagemDTO } from '../../models/Passagem.dto';

@Component({
  selector: 'app-tabela-passagens',
  templateUrl: './tabela-passagens.component.html',
  styleUrls: ['./tabela-passagens.component.css']
})
export class TabelaValoresPassagensComponent implements OnInit {

  displayedColumns: string[] = ['tipoTransporte', 'valor'];
  dataSource;
  passagens: PassagemDTO[] = [];

  constructor(private passagensService: PassagensService,
              private router: Router) { }

  ngOnInit() {
      this.loadPassagens();
  }

  loadPassagens() {
      this.passagensService.findAll().subscribe( response => { this.passagens = response;
        }, error => { console.log(error); } );
  }
  cancel() {
    this.router.navigate(['/index']);
  }
}
