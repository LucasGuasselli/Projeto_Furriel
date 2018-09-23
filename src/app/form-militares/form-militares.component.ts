import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { CrudMilitaresService } from '../crud-militares.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-form-militares',
  templateUrl: './form-militares.component.html',
  styleUrls: ['./form-militares.component.css']
})
export class FormMilitaresComponent implements OnInit {
  titulo = "Cadastro de Militares";
  militar:Militar;
  codigo:number;
  constructor(private servico:CrudMilitaresService,private router:Router, private rota:ActivatedRoute) { }

//ao iniciar a classe e instanciado um objeto militar
  ngOnInit() {
    this.codigo = this.rota.snapshot.params['cod']; 

  if (isNaN(this.codigo)){
    this.militar  = new Militar();
  }else{
    this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codigo));
    }
  }

//adicionando um militar no array
  salvarMilitar(){
    if(isNaN(this.codigo)){
       this.servico.adiocionarMilitar(this.militar);
       this.militar = new Militar();
    }else{
      this.servico.atualizaMilitar(this.codigo, this.militar);
    }
    
    this.router.navigate(['/listaMilitares']);
}

//cancelando cadastro
  cancelar(){
    this.router.navigate(['/listaMilitares']);
  }

}//fecha classe
