import { Component, OnInit } from '@angular/core';
import { Militar } from '../militar';
import { Endereco } from '../endereco';
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
  endereco:Endereco;
  codMilitar:number;
  codEndereco:number;
  constructor(private servico:CrudMilitaresService,private router:Router, private rota:ActivatedRoute) { }

//ao iniciar a classe e instanciado um objeto militar
  ngOnInit() {
    this.codMilitar = this.rota.snapshot.params['cod']; 

  if (isNaN(this.codMilitar)){
    this.militar  = new Militar();
    this.endereco  = new Endereco();

  }else{
    this.militar = Object.assign({}, this.servico.getMilitarPorCodigo(this.codMilitar));
    this.endereco = Object.assign({}, this.servico.getEnderecoPorCodigo(this.codMilitar));

    }
  }

//adicionando um militar no array
  salvarMilitar(){
    if(isNaN(this.codMilitar)){
       this.servico.adiocionarMilitar(this.militar,this.endereco);
       this.militar = new Militar();
    }else{
      this.servico.atualizaMilitar(this.codMilitar, this.militar,this.endereco);
    }
    
    this.router.navigate(['/listaMilitares']);
}

//cancelando cadastro
  cancelar(){
    this.router.navigate(['/index']);
  }

}//fecha classe
