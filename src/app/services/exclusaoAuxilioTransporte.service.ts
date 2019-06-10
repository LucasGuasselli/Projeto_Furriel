import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ExclusaoAuxilioTransporteDTO } from '../models/exclusaoAuxilioTransporteDTO';

@Injectable()
export class ExclusoesAuxiliosTransporteService {

  exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<ExclusaoAuxilioTransporteDTO[]> {
        return this.http.get<ExclusaoAuxilioTransporteDTO[]>(`${API_CONFIG.baseUrl}/exclusoesAuxiliosTransporte`);
    }

    insert(obj: ExclusaoAuxilioTransporteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/exclusoesAuxiliosTransporte`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: ExclusaoAuxilioTransporteDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/exclusoesAuxiliosTransporte/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: ExclusaoAuxilioTransporteDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/exclusoesAuxiliosTransporte/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}