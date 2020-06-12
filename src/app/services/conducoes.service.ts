import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { ConducaoDTO } from '../models/conducao.dto';

@Injectable()
export class ConducoesService {

  constructor(public http: HttpClient) { }

    retornarTodos(): Observable<ConducaoDTO[]> {
        return this.http.get<ConducaoDTO[]>(`${API_CONFIG.baseUrl}/conducoes`);
    }

    retornarConducoesPorAuxilioTransporteId(id: number): Observable<ConducaoDTO[]> {
      return this.http.get<ConducaoDTO[]>(`${API_CONFIG.baseUrl}/conducoes/findConducoesByAuxilioTransporteId/${id}`);
    }

    inserir(obj: ConducaoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/conducoes`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    // 
    inserirNovaConducao(obj: ConducaoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/conducoes/insertNewConducao`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }    

    editar(obj: ConducaoDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/conducoes/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    deletar(obj: ConducaoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/conducoes/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
