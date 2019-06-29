import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AditamentosService } from '../../services/aditamentos.service';
import { AditamentoDTO } from '../../models/aditamento.dto';


@Component({
  selector: 'app-form-aditamento',
  templateUrl: './form-aditamento.component.html',
  styleUrls: ['./form-aditamento.component.css']
})
export class FormAditamentoComponent implements OnInit {

  aditamento: AditamentoDTO = new AditamentoDTO();
  constructor(private aditamentosService: AditamentosService,
              private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {

  }

  saveAditamento() {
      this.aditamentosService.insert(this.aditamento).subscribe( response =>  { if (response.status === 201) {}
     console.log(response); },  error => {console.log(error); } );
  }

  cancel() {
    this.router.navigate(['/index']);
  }
}
