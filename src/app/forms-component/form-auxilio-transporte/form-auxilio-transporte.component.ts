import { Component, OnInit } from '@angular/core';
import { MilitaresService } from '../../services/militares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MilitarDTO } from '../../models/militar.dto';
import { InclusaoAuxilioTransporteDTO } from '../../models/inclusaoAuxilioTransporte.dto';
import { AuxilioTransporteDTO } from '../../models/auxilioTransporte.dto';
import { AuxiliosTransporteService } from '../../services/auxiliosTransporte.service';
import { ConducoesService } from '../../services/conducoes.service';
import { ConducaoDTO } from '../../models/conducao.dto';
import { InclusoesAuxilioTransporteService } from '../../services/inclusoesAuxilioTransporte.service';
import { UtilService } from '../../services/util.service';
import { AditamentoDTO } from '../../models/aditamento.dto';
import { AditamentosService } from '../../services/aditamentos.service';

@Component({
  selector: 'app-form-auxilio-transporte',
  templateUrl: './form-auxilio-transporte.component.html',
  styleUrls: ['./form-auxilio-transporte.component.css']
})
export class FormAuxilioTransporteComponent implements OnInit {

    titulo = 'Cadastro de AuxilioTransporte';

    conducoes: ConducaoDTO[] = [
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        {id: null, auxilioTransporteId: null, itinerario: null, nomeEmpresa: null, tipoDeTransporte: null, valor: null},
        ];

    // array com todos auxilios Transporte
    auxiliosTransporte: AuxilioTransporteDTO[] = [];
    // objeto usado para inserir um auxílio no banco
    auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO;
    militaresSemAuxilioTransporte: MilitarDTO[] = [];
    inclusaoAuxilioTransporte: InclusaoAuxilioTransporteDTO = new InclusaoAuxilioTransporteDTO();

    auxTransp: AuxilioTransporteDTO = new AuxilioTransporteDTO();
    precCP: number;
    aditamentoAtual: AditamentoDTO = null;

   //  postoGraduacao: PostoGraduacao[] = [];

    constructor(private militaresService: MilitaresService,
                private router: Router, private rota: ActivatedRoute,
                private auxiliosTransporteService: AuxiliosTransporteService,
                private inclusaoAuxilioTransporteService: InclusoesAuxilioTransporteService,
                private conducoesService: ConducoesService,
                private aditamentoService: AditamentosService,
                private utilService: UtilService) { }

   ngOnInit() {
    this.aditamentoAtual = this.aditamentoService.getAditamentoAtual();
    if ( this.aditamentoAtual == null)    {
        alert('Selecione um aditamento!');
        this.router.navigate(['/index']);
    }
        this.loadMilitaresSemAuxilioTransporte();
        this.loadAuxiliosTransporte();
    }

    saveAuxilioTransporteAndConducoes() {
        if ( this.aditamentoAtual == null)    {
            alert('Selecione um aditamento!');
        } else {
            if (isNaN(this.precCP)) {
                alert('selecione um militar!');
            } else {

            // cadastra no banco e atualiza os auxilios transportes
                this.insertAuxilioTransporte();
            }
        }
    }

    // alem de inserir um auxilioTransporte no banco, carrega novamente via GET os auxilios e militares sem auxilio
    insertAuxilioTransporte() {
        if (isNaN(this.precCP)) {
            alert('selecione um militar!');
       } else {
            this.auxilioTransporte.militarPrecCP = this.precCP;
            console.log(this.auxilioTransporte);
            this.auxiliosTransporteService.insert(this.auxilioTransporte).subscribe(
                response => { console.log(response); console.log('Auxilio Transporte cadastrado com sucesso');
                this.validConducoes(); this.loadAuxiliosTransporte();
                this.loadMilitaresSemAuxilioTransporte(); } ,
                error => {console.log(error); } );
       }
    }

    findAuxilioTransporteByPerecCP() {
        this.auxiliosTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
            response => { this.auxTransp = response; this.insertInclusaoAuxilioTransporte(
                this.inclusaoAuxilioTransporte, this.aditamentoAtual.id, this.precCP,
                this.auxTransp.valorTotalAT); }, error => {console.log(error); });
    }

    insertConducao(conducao: ConducaoDTO, auxilioTransporteId: number) {
        conducao.auxilioTransporteId = auxilioTransporteId;
        this.conducoesService.insert(conducao).subscribe(
            response => { console.log('Conducao cadastrada com sucesso'); console.log(conducao); } ,
            error => {console.log(error); } );
    }

    insertInclusaoAuxilioTransporte(inclusao: InclusaoAuxilioTransporteDTO, aditamentoId: number, precCP: number, valor: number) {
        inclusao.militarPrecCP = precCP;
        inclusao.aditamentoId = aditamentoId;
        inclusao.valor = valor;
        inclusao.dataInicio = this.utilService.formatDate(inclusao.dataInicio.toString());
        this.inclusaoAuxilioTransporteService.insert(inclusao).subscribe(
            response => { console.log('Inclusao cadastrada com sucesso'); console.log(inclusao); },
            error => {console.log(error); }
        );
    }

    validConducoes() {
        const conducoesValidas: number [] = [];
        // busca os indices validos para cadastrar as conducoes
        // isto foi necessario para cadastrar a inclusao somente depois do cadastro da ULTIMA CONDUCAO
            for (let k = 0; k < this.conducoes.length; k++) {
                // todos campos devem ser preenchidos para cadastrar uma conducao
                    if (this.conducoes[k].valor != null && this.conducoes[k].tipoDeTransporte != null
                        && this.conducoes[k].nomeEmpresa != null && this.conducoes[k].itinerario != null) {
                            conducoesValidas.push(k);
                    }
            }

            for (let i = 0; i < conducoesValidas.length; i++) {
                this.auxiliosTransporteService.findAuxilioTransporteByPrecCP(this.precCP).subscribe(
                    response => { this.auxTransp = response;
                    this.insertConducao(this.conducoes[conducoesValidas[i]], this.auxTransp.id);
                     if (i === (conducoesValidas.length - 1)) { this.findAuxilioTransporteByPerecCP(); }
                    this.auxTransp = new AuxilioTransporteDTO(); }, error => {console.log(error); }
                );
            }
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
            console.log(this.precCP);
        }
    }

    informarCadastro() {
        alert('Cadastro efetuado com sucesso!');
    }

    cancel() {
        this.router.navigate(['/index']);
    }
}

