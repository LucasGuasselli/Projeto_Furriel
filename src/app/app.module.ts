import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TabelaMilitaresComponent } from './tabela-militares/tabela-militares.component';
import { FormMilitaresComponent } from './form-militares/form-militares.component';
import { CrudMilitaresService } from './services/crud-militares.service';
import { CrudAuxilioTransporteService } from './crud-auxilio-transporte.service';
import { IndexComponent } from './index/index.component';
import { FormAuxilioTransporteComponent } from './form-auxilio-transporte/form-auxilio-transporte.component';
import { TabelaAuxilioTransporteComponent } from './tabela-auxilio-transporte/tabela-auxilio-transporte.component';
import { FormDescontosComponent } from './form-descontos/form-descontos.component';
import { TabelaDescontosComponent } from './tabela-descontos/tabela-descontos.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FormPagamentoAtrasadoComponent } from './form-pagamento-atrasado/form-pagamento-atrasado.component';
import { FormAditamentoComponent } from './form-aditamento/form-aditamento.component';
import { TabelaAditamentosComponent } from './tabela-aditamentos/tabela-aditamentos.component';
import { CrudAditamentosService } from './crud-aditamentos.service';
import { TabelaPagamentosAtrasadosComponent } from './tabela-pagamentos-atrasados/tabela-pagamentos-atrasados.component';
import { CrudPagamentoAtrasadoService } from './crud-pagamento-atrasado.service';
import { FormExclusaoAuxilioTransporteComponent } from './form-exclusao-auxilio-transporte/form-exclusao-auxilio-transporte.component';
// tslint:disable-next-line:max-line-length
import { TabelaExclusaoAuxiliosTransporteComponent } from './tabela-exclusao-auxilios-transporte/tabela-exclusao-auxilios-transporte.component';
// tslint:disable-next-line:max-line-length
import { FormAtualizacaoAuxilioTransporteComponent } from './form-atualizacao-auxilio-transporte/form-atualizacao-auxilio-transporte.component';
import { EnderecosService } from './services/Enderecos.service';
import { PostosGraduacoesService } from './services/postosGraduacoes.service';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent },

    { path: 'cadastroDeMilitar', component: FormMilitaresComponent },
    { path: 'cadastroDeAT', component: FormAuxilioTransporteComponent },
    { path: 'cadastroDeDesconto', component: FormDescontosComponent },
    { path: 'cadastroPagamentoAtrasado', component: FormPagamentoAtrasadoComponent },
    { path: 'cadastroAditamento', component: FormAditamentoComponent },
    { path: 'cadastroExclusaoAuxilioTransporte', component: FormExclusaoAuxilioTransporteComponent },
   // { path: 'cadastroAtualizacaoAuxilioTransporte', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'listaMilitares', component: TabelaMilitaresComponent },
    { path: 'listaATConducao', component: TabelaAuxilioTransporteComponent },
    { path: 'listaDesconto', component: TabelaDescontosComponent },
    { path: 'listaAditamento', component: TabelaAditamentosComponent },
    { path: 'listaPagamentoAtrasado', component: TabelaPagamentosAtrasadosComponent },
    { path: 'listaExclusaoAuxiliosTransporte', component: TabelaExclusaoAuxiliosTransporteComponent },

    { path: 'edicaoMilitar/:cod', component: FormMilitaresComponent },
    { path: 'edicaoPagamentoAtrasado/:cod', component: FormPagamentoAtrasadoComponent },
    { path: 'cadastroAtualizacaoAuxilioTransporte/:cod', component: FormAtualizacaoAuxilioTransporteComponent},

    { path: 'relatorio', component: RelatorioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TabelaMilitaresComponent,
    FormMilitaresComponent,
    IndexComponent,
    FormAuxilioTransporteComponent,
    TabelaAuxilioTransporteComponent,
    FormDescontosComponent,
    TabelaDescontosComponent,
    RelatorioComponent,
    FormPagamentoAtrasadoComponent,
    FormAditamentoComponent,
    TabelaAditamentosComponent,
    TabelaPagamentosAtrasadosComponent,
    FormExclusaoAuxilioTransporteComponent,
    TabelaExclusaoAuxiliosTransporteComponent,
    FormAtualizacaoAuxilioTransporteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CrudMilitaresService, CrudAuxilioTransporteService, CrudAditamentosService,
              CrudPagamentoAtrasadoService, EnderecosService, PostosGraduacoesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
