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
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

// FORMS
import { FormMilitaresComponent } from './forms-component/form-militares/form-militares.component';
import { FormDespesasFeriadosAdmComponent } from './forms-component/form-despesas-feriados-adm/form-despesas-feriados-adm.component';
import { FormAuxilioTransporteComponent } from './forms-component/form-auxilio-transporte/form-auxilio-transporte.component';
import { FormDespesasComponent } from './forms-component/form-despesas/form-despesas.component';
import { FormSaqueAtrasadoComponent } from './forms-component/form-saque-atrasado/form-saque-atrasado.component';
import { FormAditamentoComponent } from './forms-component/form-aditamento/form-aditamento.component';
// tslint:disable-next-line:max-line-length
import { FormDespesaGuarnicaoServicoComponent } from './forms-component/form-despesa-guarnicao-servico/form-despesa-guarnicao-servico.component';
// tslint:disable-next-line:max-line-length
import { FormAtualizacaoAuxilioTransporteComponent } from './forms-component/form-atualizacao-auxilio-transporte/form-atualizacao-auxilio-transporte.component';
// tslint:disable-next-line:max-line-length
import { FormExclusaoAuxilioTransporteComponent } from './forms-component/form-exclusao-auxilio-transporte/form-exclusao-auxilio-transporte.component';

// TABLES
import { TabelaAuxilioTransporteComponent } from './tabelas-component/tabela-auxilio-transporte/tabela-auxilio-transporte.component';
import { TabelaDespesasAAnularComponent } from './tabelas-component/tabela-despesas-a-anular/tabela-despesas-a-anular.component';
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
import { SaquesAtrasadosService } from './services/saquesAtrasados.service';
import { AtualizacoesAuxilioTransporteService } from './services/atualizacoesAuxilioTransporte.service';
import { AditamentosService } from './services/aditamentos.service';
import { PassagensService } from './services/passagens.service';
import { FormPassagensComponent } from './forms-component/form-passagens/form-passagens.component';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent },

    { path: 'cadastroMilitar', component: FormMilitaresComponent },
    { path: 'cadastroAT', component: FormAuxilioTransporteComponent },
    { path: 'cadastroDespesa', component: FormDespesasComponent },
    { path: 'cadastroDespesasGuarnicao', component: FormDespesaGuarnicaoServicoComponent },
    { path: 'cadastroDespesaFeriadoAdm', component: FormDespesasFeriadosAdmComponent },
    { path: 'cadastroPagamentoAtrasado', component: FormSaqueAtrasadoComponent },
    { path: 'cadastroAditamento', component: FormAditamentoComponent },
    { path: 'cadastroExclusaoAuxilioTransporte', component: FormExclusaoAuxilioTransporteComponent },
    { path: 'cadastroPassagem', component: FormPassagensComponent},
       // { path: 'cadastroAtualizacaoAuxilioTransporte', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'listaMilitares', component: TabelaMilitaresComponent },
    { path: 'listaATConducao', component: TabelaAuxilioTransporteComponent },
    { path: 'listaDespesas', component: TabelaDespesasAAnularComponent },
    { path: 'listaAditamento', component: TabelaAditamentosComponent },
    { path: 'listaPagamentoAtrasado', component: TabelaPagamentosAtrasadosComponent },
    { path: 'listaExclusaoAuxiliosTransporte', component: TabelaExclusaoAuxiliosTransporteComponent },
    { path: 'listaValoresPassagens', component: TabelaValoresPassagensComponent},

    { path: 'edicaoMilitar/:cod', component: FormMilitaresComponent },
    { path: 'edicaoPassagem/:cod', component: FormPassagensComponent },
    { path: 'edicaoPagamentoAtrasado/:cod', component: FormSaqueAtrasadoComponent },
    { path: 'edicaoAditamento/:cod', component: FormAditamentoComponent },
    { path: 'cadastroAtualizacaoAuxilioTransporte/:cod', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'relatorio', component: RelatorioComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    FormMilitaresComponent,
    FormSaqueAtrasadoComponent,
    FormAditamentoComponent,
    FormAuxilioTransporteComponent,
    FormDespesasComponent,
    FormExclusaoAuxilioTransporteComponent,
    FormAtualizacaoAuxilioTransporteComponent,
    FormDespesasFeriadosAdmComponent,
    FormPassagensComponent,
    FormDespesaGuarnicaoServicoComponent,
    TabelaAditamentosComponent,
    TabelaPagamentosAtrasadosComponent,
    TabelaExclusaoAuxiliosTransporteComponent,
    TabelaValoresPassagensComponent,
    TabelaMilitaresComponent,
    TabelaAuxilioTransporteComponent,
    TabelaDespesasAAnularComponent,
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
    MatCheckboxModule,
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
              ConducoesService, SaquesAtrasadosService, PassagensService, AtualizacoesAuxilioTransporteService, AditamentosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
