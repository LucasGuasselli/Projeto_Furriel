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
import { SaqueAtrasadoDTO } from "../../models/saqueAtrasado.dto";
import { SaquesAtrasadosService } from "../../services/saquesAtrasados.service";
import { PassagemDTO } from "../../models/Passagem.dto";
import { PassagensService } from "../../services/passagens.service";

@Component({
  selector: 'app-form-auxilio-transporte',
  templateUrl: './form-auxilio-transporte.component.html',
  styleUrls: ['./form-auxilio-transporte.component.css']
})
export class FormAuxilioTransporteComponent implements OnInit {

    titulo = 'Cadastro de Auxílio Transporte';

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

    aditamentoAtual: AditamentoDTO = null;
    // array com todos auxilios Transporte
        auxiliosTransporte: AuxilioTransporteDTO[] = [];
    // objeto usado para inserir um auxílio no banco
        auxilioTransporte: AuxilioTransporteDTO = new AuxilioTransporteDTO;
        militaresSemAuxilioTransporte: MilitarDTO[] = [];
        inclusaoAuxilioTransporte: InclusaoAuxilioTransporteDTO = new InclusaoAuxilioTransporteDTO();
        saqueAtrasado: SaqueAtrasadoDTO  = new SaqueAtrasadoDTO;
        passagens: PassagemDTO[] = [];
    // objeto usado no looping para cadastrar as conducoes
        auxTransp: AuxilioTransporteDTO = new AuxilioTransporteDTO();
        precCP: number;
        data: Date = new Date();
    // utilizada na regra de negocio do saque atrasado
        dataFim: Date = new Date();

   //  postoGraduacao: PostoGraduacao[] = [];

    constructor(private militaresService: MilitaresService,
                private router: Router, private rota: ActivatedRoute,
                private auxiliosTransporteService: AuxiliosTransporteService,
                private inclusaoAuxilioTransporteService: InclusoesAuxilioTransporteService,
                private conducoesService: ConducoesService,
                private saquesAtrasadosService: SaquesAtrasadosService,
                private aditamentoService: AditamentosService,
                private passagensService: PassagensService,
                private utilService: UtilService) { }

   ngOnInit() {
    this.aditamentoAtual = this.aditamentoService.retornarAditamentoAtual();
        if ( this.aditamentoAtual == null)    {
            alert('Selecione um aditamento!');
                // retorna para pagina inicial caso nao tenha nenhum aditamento selecionado
                this.router.navigate(['/index']);
        }
            this.carregarPassagens();
            this.carregarMilitaresSemAuxilioTransporte();
           // this.loadAuxiliosTransporte();
    }

    carregarPassagens() {
      this.passagensService.retornarTodos().subscribe( response => { this.passagens = response; },
        error => { console.log(error); } );
    }

    carregarMilitaresSemAuxilioTransporte() {
        this.militaresService.retornarMilitaresSemAuxilioTransporte().subscribe(
            response => { this.militaresSemAuxilioTransporte = response;  } , error => {console.log(error); } );
    }
/*
    loadAuxiliosTransporte() {
        this.auxiliosTransporteService.findAll().subscribe(
            response => {this.auxiliosTransporte = response; } , error => {console.log(error); } );
    }
*/
    validarAuxilioTransporteEConducoes() {
        if ( this.aditamentoAtual == null)    {
            alert('Selecione um aditamento!');
        } else {
            if (isNaN(this.precCP)) {
                alert('Selecione um militar!');
            } else {
                this.validaSelecaoMilitar();
            }
        }
    }

// valida se algum militar foi selecionado
    validaSelecaoMilitar() {
        if (isNaN(this.precCP)) {
            alert('Selecione um militar!');
       } else {
           this.inserirAuxilioTransporte();
       }
    }
    
// alem de inserir um auxilioTransporte no banco, carrega novamente via GET os militares sem auxilio
    inserirAuxilioTransporte() {
        this.auxilioTransporte.militarPrecCP = this.precCP;
            // console.log(this.auxilioTransporte);
            this.auxiliosTransporteService.inserir(this.auxilioTransporte).subscribe(
                response => { this.validarConducoes(); this.carregarMilitaresSemAuxilioTransporte(); }, error => {console.log(error); } );
    }

// VERIFICAR COMENTARIO E METODO ABAIXO
// esta validacao deve ser realizada antes de cadastrar um auxilio transporte!!
    validarConducoes() {
        const conducoesValidas: number [] = [];
        // busca os indices validos para cadastrar as conducoes
            for (let k = 0; k < this.conducoes.length; k++) {
                // todos campos devem ser preenchidos para cadastrar uma conducao
                    if (this.conducoes[k].valor != null && this.conducoes[k].tipoDeTransporte != null && this.conducoes[k].nomeEmpresa != null && this.conducoes[k].itinerario != null) {
                            conducoesValidas.push(k);
                    }
            }

        // este 'for' foi necessario para cadastrar a inclusao somente depois do cadastro da ULTIMA CONDUCAO
            for (let i = 0; i < conducoesValidas.length; i++) {
                // variavel valida: boolean serve para saber quando a ultima conducao vai ser cadastrada
                let valida = false;
                this.auxiliosTransporteService.retornarAuxilioTransportePorPrecCP(this.precCP).subscribe(
                    response => { 
                        this.auxTransp = response;
                            if (i === (conducoesValidas.length - 1) ) { 
                                valida = true; 
                            }
                                this.inserirConducao(this.conducoes[conducoesValidas[i]], this.auxTransp, valida);
                                    this.auxTransp = new AuxilioTransporteDTO(); 
                    }, 
                        error => {console.log(error); }
                );
            }
    }

    inserirConducao(conducao: ConducaoDTO, auxilioTransporte: AuxilioTransporteDTO, valida: boolean) {
        conducao.auxilioTransporteId = auxilioTransporte.id;
            this.conducoesService.inserir(conducao).subscribe(
                response => { 
                    if (valida === true && response.status === 201 ) { 
                        this.prepararInclusaoAuxilioTransporte();
                        this.prepararSaqueAtrasado(auxilioTransporte); 
                    }
                    console.log('Conducao cadastrada com sucesso'); 
                }, error => {console.log(error); } );
    }

    prepararInclusaoAuxilioTransporte() {
        this.inclusaoAuxilioTransporte.militarPrecCP = this.precCP;
        this.inclusaoAuxilioTransporte.aditamentoId = this.aditamentoAtual.id;
        this.inclusaoAuxilioTransporte.valor = 0;
        this.inclusaoAuxilioTransporte.dataInicio = this.utilService.formatarData(this.data.toString());
            this.inserirInclusaoAuxilioTransporte();
    }

    inserirInclusaoAuxilioTransporte() {
        this.inclusaoAuxilioTransporteService.inserir(this.inclusaoAuxilioTransporte).subscribe(
           response => {
               if (response.status === 201) { 
                   this.moverParaListaAuxiliosEConducoes(); } 
           },
           error => {console.log(error); }
        );
    }    

    prepararSaqueAtrasado(auxilioTransporte: AuxilioTransporteDTO) {
        this.saqueAtrasado.aditamentoId = this.aditamentoAtual.id;
        this.saqueAtrasado.militarPrecCP = this.precCP;
        this.saqueAtrasado.motivo = 'Inclusão de Auxílio Transporte';
        this.saqueAtrasado.mesReferencia = this.utilService.retornarNomeMes(this.data.toString());
        
        // a quantidade e a soma dos dias restantes do mes atual + 22 dias conforme regra de negocio
            // variavel dataFim utilizada para realizar o calculo dos dias restantes
            this.dataFim.setDate(this.data.getDate());
                this.saqueAtrasado.quantidadeDias = this.utilService.calcularQuantidadeDias(this.data, this.dataFim, 'Atualizacao Auxilio' , 0, 0);
            console.log(this.saqueAtrasado.quantidadeDias);
                this.saqueAtrasado.valor = auxilioTransporte.valorDiarioAT * this.saqueAtrasado.quantidadeDias;
            console.log(this.saqueAtrasado.valor);
                    this.inserirSaqueAtrasado();
    }

   // este metodo serve para cadastrar um saque atrasado referente a inclusao do Auxilio Transporte, tendo em vista que o militar só recebe pelo menos um mes e um dia apos a solicitacao
    inserirSaqueAtrasado() {
            this.saquesAtrasadosService.inserirSaqueAtrasadoInclusao(this.saqueAtrasado).subscribe(
                 response => { if(response.status == 201) { console.log( 'Cadastro de saque atrasado com sucesso!' ); } ; },
                     error => { console.log(error); }
            );
    }

    retornarAuxilioTransportePorPrecCP() {
        this.auxiliosTransporteService.retornarAuxilioTransportePorPrecCP(this.precCP).subscribe(
            response => { this.auxTransp = response; }, error => {console.log(error); });
    }

    salvarPrecCPMilitar(precCP: number) {
        if (isNaN(precCP)) {

        } else {
            this.precCP = precCP;
            // console.log(this.precCP);
        }
    }

    salvarValorTipoTransp(conducao: ConducaoDTO, tipoTransp: PassagemDTO) {
        conducao.valor = tipoTransp.valor;
    }
    
    moverParaListaAuxiliosEConducoes() {
        this.router.navigate(['/listaATConducao']);
    }

    informarCadastro() {
        alert('Cadastro efetuado com sucesso!');
    }

    cancelar() {
        this.router.navigate(['/index']);
    }
}

