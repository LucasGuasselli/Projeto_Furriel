import { Component, OnInit } from '@angular/core';
import { ExclusaoAuxilioTransporteDTO } from '../../models/exclusaoAuxilioTransporte.dto';
import { ExclusoesAuxilioTransporteService } from '../../services/exclusaoAuxilioTransporte.service';
import { MilitaresService } from '../../services/militares.service';
import { PostosGraduacoesService } from '../../services/postosGraduacoes.service';
import { Router } from '@angular/router';
import { MilitarDTO } from '../../models/militar.dto';
import { PostoGraduacaoDTO } from '../../models/postoGraduacao.dto';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tabela-exclusao-auxilios-transporte',
  templateUrl: './tabela-exclusao-auxilios-transporte.component.html',
  styleUrls: ['./tabela-exclusao-auxilios-transporte.component.css']
})
export class TabelaExclusaoAuxiliosTransporteComponent implements OnInit {

  exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO[] = [];
  militares: MilitarDTO[] = [];
  postoGraduacao: PostoGraduacaoDTO;

  displayedColumns: string[] = ['graduacaoNome', 'militarPrecCP', 'data', 'motivo', 'valor'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private exclusoesAuxilioTransporteService: ExclusoesAuxilioTransporteService,
              private militaresService: MilitaresService,
              private postosGraduacoesService: PostosGraduacoesService,
              private router: Router) { }

  ngOnInit() {
    this.loadExclusoes();
  }

  loadExclusoes() {
    this.exclusoesAuxilioTransporteService.findAll().subscribe(response => {this.dataSource = response;
    console.log(this.exclusaoAuxiliosTransporte); this.assignMilitares(this.dataSource); } ,
      error => {console.log(error); } );
  }

  assignMilitares(exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO[]) {
    for (let i = 0; i < exclusaoAuxiliosTransporte.length; i++) {
        this.militaresService.findMilitarByPrecCP(exclusaoAuxiliosTransporte[i].militarPrecCP).subscribe(
          response => {this.militares[i] = response; exclusaoAuxiliosTransporte[i].nome = this.militares[i].nome;
                      this.assignGraduacoes(exclusaoAuxiliosTransporte[i], this.militares[i]); },
          error => {console.log(error); }
        );
    }
    this.dataSource = new MatTableDataSource(exclusaoAuxiliosTransporte);
  }

  assignGraduacoes(exclusaoAuxiliosTransporte: ExclusaoAuxilioTransporteDTO, militar: MilitarDTO) {
      this.postosGraduacoesService.findPostoGraduacaoById(militar.postoGraduacaoId).subscribe(
        response => {this.postoGraduacao = response; exclusaoAuxiliosTransporte.graduacao = this.postoGraduacao.nome; },
           error => {console.log(error); } );
  }

  moveToFormExclusao() {
    this.router.navigate(['/cadastroExclusaoAuxilioTransporte']);
  }

  cancel() {
    this.router.navigate(['/index']);
  }

}
