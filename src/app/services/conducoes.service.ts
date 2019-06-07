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

    // retorna todos militares cadastrados
    findAll(): Observable<ConducaoDTO[]> {
        return this.http.get<ConducaoDTO[]>(`${API_CONFIG.baseUrl}/conducoes`);
    }

    insert(obj: ConducaoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/conducoes`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: ConducaoDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/conducoes/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: ConducaoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/conducoes/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
