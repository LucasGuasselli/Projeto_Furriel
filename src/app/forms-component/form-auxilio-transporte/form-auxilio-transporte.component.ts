import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { CrudAuxilioTransporteService } from '../../crud-auxilio-transporte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Conducao } from '../../conducao';
import { CrudAditamentosService } from '../../crud-aditamentos.service';
import { MilitarDTO } from '../../models/militar.dto';
import { InclusaoAuxilioTransporteDTO } from '../../models/inclusaoAuxilioTransporteDTO';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { Aditamento } from '../../aditamento';
import { ConducoesService } from '../../services/conducoes.service';
import { ConducaoDTO } from '../../models/conducao.dto';

@Component({
  selector: 'app-form-auxilio-transporte',
  templateUrl: './form-auxilio-transporte.component.html',
  styleUrls: ['./form-auxilio-transporte.component.css']
})
export class FormAuxilioTransporteComponent implements OnInit {

    titulo = 'Cadastro de AuxilioTransporte';

    conducoes: ConducaoDTO[] = [
        // tslint:disable-next-line:max-line-length
        {id: null, auxilioTransporteId: null, itinerario: null,
                                nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                    nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                    nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null,
                                    nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        ];

    auxiliosTransporte: AuxilioTransporteDTO[] = [];
    // objeto usado para insert
    auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO;
    militaresSemAuxilioTransporte: MilitarDTO[] = [];
    inclusaoAuxilioTransporte: InclusaoAuxilioTransporteDTO = new InclusaoAuxilioTransporteDTO();

    precCP: number;
    conducaoId: number;
    aditamentoAtual: Aditamento;

   //  postoGraduacao: PostoGraduacao[] = [];

    constructor(private militaresService: MilitaresService,
                private router: Router, private rota: ActivatedRoute,
                private auxiliosTransporteService: AuxiliosTransporteService,
                private conducoesService: ConducoesService,
                private servicoCrudAditamento: CrudAditamentosService) { }

   ngOnInit() {
        this.loadMilitaresSemAuxilioTransporte();
        this.loadAuxiliosTransporte();
        this.aditamentoAtual = this.servicoCrudAditamento.getAditamentoAtual();

    }

    verifyConducoes() {
        if ( this.aditamentoAtual == null)    {
            alert('Selecione um aditamento!');
        } else {
            if (isNaN(this.precCP)) {
                alert('selecione um militar!');
            } else {
            // tslint:disable-next-line:prefer-const
                let auxTransp: AuxilioTransporteDTO[] = [];
            // cadastra no banco e atualiza os auxilios transportes
                this.insertAuxilioTransporte(this.precCP);

        // verificando quais conducoes foram preenchidas corretamente para executar a inserção
            // tslint:disable-next-line:triple-equals
                for (let k = 0; k < this.conducoes.length; k++) {
                    if (this.conducoes[k].valor != null && this.conducoes[k].tipoDeTransporte != null
                        && this.conducoes[k].nomeEmpresa != null && this.conducoes[k].itinerario != null) {
                            this.auxiliosTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
                                response => { auxTransp[k] = response; this.insertConducao(this.conducoes[k], auxTransp[k].id); },
                                error => {console.log(error); }
                            );
                    }
                }
            }
        }
    }

    // alem de inserir um auxilioTransporte no banco, carrega novamente via GET os auxilios e militares sem auxilio
    insertAuxilioTransporte(militarPrecCP: number) {
        if (isNaN(this.precCP)) {
            alert('selecione um militar!');
       } else {
            this.auxilioTransporte.militarPrecCP = militarPrecCP;
            this.auxiliosTransporteService.insert(this.auxilioTransporte).subscribe(
                response => { console.log('Auxilio Transporte cadastrado com sucesso');
                this.loadAuxiliosTransporte(); this.loadMilitaresSemAuxilioTransporte(); } ,
                error => {console.log(error); } );
       }
    }

    insertConducao(conducao: ConducaoDTO, auxilioTransporteId: number) {
        conducao.auxilioTransporteId = auxilioTransporteId;
        this.conducoesService.insert(conducao).subscribe(
            response => { console.log('Conducao cadastrada com sucesso'); console.log(conducao); } ,
            error => {console.log(error); } );
    }

    loadMilitaresSemAuxilioTransporte() {
        this.militaresService.findMilitaresSemAuxilioTransporte().subscribe(
            response => {this.militaresSemAuxilioTransporte = response; console.log(this.militaresSemAuxilioTransporte); } ,
            error => {console.log(error); } );
    }

    loadAuxiliosTransporte() {
        this.auxiliosTransporteService.findAll().subscribe(
            response => {this.auxiliosTransporte = response; console.log(this.auxiliosTransporte); } ,
            error => {console.log(error); } );
    }

    savePrecCPMilitar(precCP: number) {
        if (isNaN(precCP)) {

        } else {
            this.precCP = precCP;
        }
    }

    informarCadastro() {
        alert('Cadastro efetuado com sucesso!');
    }

    cancelar() {
        this.router.navigate(['/index']);
    }
}

