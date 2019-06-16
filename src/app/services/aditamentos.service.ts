import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AtualizacaoAuxilioTransporteDTO } from '../models/atualizacaoAuxilioTransporte.dto';
import { AditamentoDTO } from '../models/aditamento.dto';

@Injectable()
export class AditamentosService {

  aditamento: AditamentoDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<AditamentoDTO[]> {
        return this.http.get<AditamentoDTO[]>(`${API_CONFIG.baseUrl}/aditamentos`);
    }

    insert(obj: AditamentoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/aditamentos`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: AditamentoDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/aditamentos/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: AditamentoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/aditamentos/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}