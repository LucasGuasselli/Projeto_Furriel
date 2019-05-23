import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { DespesaDTO } from '../models/despesa.dto';

@Injectable()
export class DespesasService {

  contador = 0;
  autoIncrement = 3;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<DespesaDTO[]> {
        return this.http.get<DespesaDTO[]>(`${API_CONFIG.baseUrl}/despesas`);
    }


    findPrecCPById(id: number): Observable<DespesaDTO> {
        return this.http.get<DespesaDTO>(`${API_CONFIG.baseUrl}/despesas/searchPrecCPById/?id=${id}`);
    }

    insert(obj: DespesaDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/despesas`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: DespesaDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/despesas/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: DespesaDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/despesas/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
