import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { InclusaoAuxilioTransporteDTO } from '../models/inclusaoAuxilioTransporte.dto';

@Injectable()
export class InclusoesAuxilioTransporteService {

  inclusaoAuxilioTransporte: InclusaoAuxilioTransporteDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<InclusaoAuxilioTransporteDTO[]> {
        return this.http.get<InclusaoAuxilioTransporteDTO[]>(`${API_CONFIG.baseUrl}/inclusoesAuxilioTransporte`);
    }

    findInclusoesByAditamentoId(id: number): Observable<InclusaoAuxilioTransporteDTO[]> {
      return this.http.get<InclusaoAuxilioTransporteDTO[]>(
          `${API_CONFIG.baseUrl}/inclusoesAuxilioTransporte/searchInclusoesByAditamentoId/${id}`);
    }

    insert(obj: InclusaoAuxilioTransporteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/inclusoesAuxilioTransporte`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: InclusaoAuxilioTransporteDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/inclusoesAuxilioTransporte/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: InclusaoAuxilioTransporteDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/inclusoesAuxilioTransporte/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
