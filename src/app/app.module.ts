import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { TabelaMilitaresComponent } from './tabela-militares/tabela-militares.component';
import { FormMilitaresComponent } from './form-militares/form-militares.component';
import { CrudMilitaresService } from './crud-militares.service';
import { CrudAuxilioTransporteService } from './crud-auxilio-transporte.service';
import { IndexComponent } from './index/index.component';
import { FormAuxilioTransporteComponent } from './form-auxilio-transporte/form-auxilio-transporte.component';
import { TabelaAuxilioTransporteComponent } from './tabela-auxilio-transporte/tabela-auxilio-transporte.component';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent },
    { path: 'listaMilitares', component: TabelaMilitaresComponent },
    { path: 'edicaoMilitar/:cod', component: FormMilitaresComponent },
    { path: 'cadastroDeMilitar', component: FormMilitaresComponent },
    { path: 'cadastroDeAT', component: FormAuxilioTransporteComponent },
    { path: 'listaATConducao', component: TabelaAuxilioTransporteComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TabelaMilitaresComponent,
    FormMilitaresComponent,
    IndexComponent,
    FormAuxilioTransporteComponent,
    TabelaAuxilioTransporteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CrudMilitaresService,CrudAuxilioTransporteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
