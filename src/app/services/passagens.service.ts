import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { PassagemDTO } from '../models/Passagem.dto';

@Injectable()
export class PassagensService {

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<PassagemDTO[]> {
        return this.http.get<PassagemDTO[]>(`${API_CONFIG.baseUrl}/passagens`);
    }

    insert(obj: PassagemDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/passagens`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: PassagemDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/passagens/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: PassagemDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/passagens/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
