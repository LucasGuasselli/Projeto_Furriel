import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { TabelaMilitaresComponent } from './tabela-militares/tabela-militares.component';
import { FormMilitaresComponent } from './form-militares/form-militares.component';
import { CrudMilitaresService } from './crud-militares.service';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full'},
    { path: 'index', component: IndexComponent },
    { path: 'listaMilitares', component: TabelaMilitaresComponent },
    { path: 'edicaoMilitar/:cod', component: FormMilitaresComponent },
    { path: 'cadastroDeMilitar', component: FormMilitaresComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TabelaMilitaresComponent,
    FormMilitaresComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CrudMilitaresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
