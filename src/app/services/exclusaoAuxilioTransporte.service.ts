import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ExclusaoAuxilioTransporteDTO } from '../models/exclusaoAuxilioTransporte.dto';

@Injectable()
export class ExclusoesAuxilioTransporteService {

  exclusaoAuxilioTransporte: ExclusaoAuxilioTransporteDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<ExclusaoAuxilioTransporteDTO[]> {
        return this.http.get<ExclusaoAuxilioTransporteDTO[]>(`${API_CONFIG.baseUrl}/exclusoesAuxilioTransporte`);
    }

    findExclusoesByAditamentoId(id: number): Observable<ExclusaoAuxilioTransporteDTO[]> {
      return this.http.get<ExclusaoAuxilioTransporteDTO[]>(
          `${API_CONFIG.baseUrl}/exclusoesAuxilioTransporte/searchExclusoesByAditamentoId/${id}`);
    }

    insert(obj: ExclusaoAuxilioTransporteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/exclusoesAuxilioTransporte`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: ExclusaoAuxilioTransporteDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/exclusoesAuxilioTransporte/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: ExclusaoAuxilioTransporteDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/exclusoesAuxilioTransporte/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
