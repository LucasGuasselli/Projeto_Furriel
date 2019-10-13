import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// ANGULAR MATERIAL
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

// FORMS
import { FormMilitaresComponent } from './forms-component/form-militares/form-militares.component';
import { FormDescontosFeriadosAdmComponent } from './forms-component/form-descontos-feriados-adm/form-descontos-feriados-adm.component';
import { FormAuxilioTransporteComponent } from './forms-component/form-auxilio-transporte/form-auxilio-transporte.component';
import { FormDescontosComponent } from './forms-component/form-descontos/form-descontos.component';
import { FormPagamentoAtrasadoComponent } from './forms-component/form-pagamento-atrasado/form-pagamento-atrasado.component';
import { FormAditamentoComponent } from './forms-component/form-aditamento/form-aditamento.component';
// tslint:disable-next-line:max-line-length
import { FormAtualizacaoAuxilioTransporteComponent } from './forms-component/form-atualizacao-auxilio-transporte/form-atualizacao-auxilio-transporte.component';
// tslint:disable-next-line:max-line-length
import { FormExclusaoAuxilioTransporteComponent } from './forms-component/form-exclusao-auxilio-transporte/form-exclusao-auxilio-transporte.component';

// TABLES
import { TabelaAuxilioTransporteComponent } from './tabelas-component/tabela-auxilio-transporte/tabela-auxilio-transporte.component';
import { TabelaDescontosComponent } from './tabelas-component/tabela-descontos/tabela-descontos.component';
import { TabelaMilitaresComponent } from './tabelas-component/tabela-militares/tabela-militares.component';
import { TabelaAditamentosComponent } from './tabelas-component/tabela-aditamentos/tabela-aditamentos.component';
import { TabelaPagamentosAtrasadosComponent } from './tabelas-component/tabela-pagamentos-atrasados/tabela-pagamentos-atrasados.component';
// tslint:disable-next-line:max-line-length
import { TabelaExclusaoAuxiliosTransporteComponent } from './tabelas-component/tabela-exclusao-auxilios-transporte/tabela-exclusao-auxilios-transporte.component';
import { TabelaValoresPassagensComponent } from './tabelas-component/tabela-passagens/tabela-passagens.component';

// SERVICES
import { MilitaresService } from './services/militares.service';
import { EnderecosService } from './services/enderecos.service';
import { PostosGraduacoesService } from './services/postosGraduacoes.service';
import { DespesasService } from './services/despesas.service';
import { UtilService } from './services/util.service';
import { ConducoesService } from './services/conducoes.service';
import { AuxiliosTransporteService } from './services/auxiliosTransporte.service';
import { InclusoesAuxilioTransporteService } from './services/inclusoesAuxilioTransporte.service';
import { ExclusoesAuxilioTransporteService } from './services/exclusaoAuxilioTransporte.service';
import { PagamentosAtrasadosService } from './services/pagamentosAtrasados.service';
import { AtualizacoesAuxilioTransporteService } from './services/atualizacoesAuxilioTransporte.service';
import { AditamentosService } from './services/aditamentos.service';
import { PassagensService } from './services/passagens.service';
import { FormPassagensComponent } from './forms-component/form-passagens/form-passagens.component';



const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent },

    { path: 'cadastroDeMilitar', component: FormMilitaresComponent },
    { path: 'cadastroDeAT', component: FormAuxilioTransporteComponent },
    { path: 'cadastroDeDesconto', component: FormDescontosComponent },
    { path: 'cadastroDeDescontoFeriadoAdm', component: FormDescontosFeriadosAdmComponent },
    { path: 'cadastroPagamentoAtrasado', component: FormPagamentoAtrasadoComponent },
    { path: 'cadastroAditamento', component: FormAditamentoComponent },
    { path: 'cadastroExclusaoAuxilioTransporte', component: FormExclusaoAuxilioTransporteComponent },
    { path: 'cadastroPassagem', component: FormPassagensComponent},
       // { path: 'cadastroAtualizacaoAuxilioTransporte', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'listaMilitares', component: TabelaMilitaresComponent },
    { path: 'listaATConducao', component: TabelaAuxilioTransporteComponent },
    { path: 'listaDesconto', component: TabelaDescontosComponent },
    { path: 'listaAditamento', component: TabelaAditamentosComponent },
    { path: 'listaPagamentoAtrasado', component: TabelaPagamentosAtrasadosComponent },
    { path: 'listaExclusaoAuxiliosTransporte', component: TabelaExclusaoAuxiliosTransporteComponent },
    { path: 'listaValoresPassagens', component: TabelaValoresPassagensComponent},

    { path: 'edicaoMilitar/:cod', component: FormMilitaresComponent },
    { path: 'edicaoPassagem/:cod', component: FormPassagensComponent },
    { path: 'edicaoPagamentoAtrasado/:cod', component: FormPagamentoAtrasadoComponent },
    { path: 'cadastroAtualizacaoAuxilioTransporte/:cod', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'relatorio', component: RelatorioComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    FormMilitaresComponent,
    FormPagamentoAtrasadoComponent,
    FormAditamentoComponent,
    FormAuxilioTransporteComponent,
    FormDescontosComponent,
    FormExclusaoAuxilioTransporteComponent,
    FormAtualizacaoAuxilioTransporteComponent,
    FormDescontosFeriadosAdmComponent,
    FormPassagensComponent,
    TabelaAditamentosComponent,
    TabelaPagamentosAtrasadosComponent,
    TabelaExclusaoAuxiliosTransporteComponent,
    TabelaValoresPassagensComponent,
    TabelaMilitaresComponent,
    TabelaAuxilioTransporteComponent,
    TabelaDescontosComponent,
    IndexComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    // <ANGULAR MATERIAL>
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // </MATERIAL>
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [MilitaresService, EnderecosService, PostosGraduacoesService, InclusoesAuxilioTransporteService,
              DespesasService, UtilService, AuxiliosTransporteService , ExclusoesAuxilioTransporteService,
              ConducoesService, PagamentosAtrasadosService, PassagensService, AtualizacoesAuxilioTransporteService, AditamentosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
