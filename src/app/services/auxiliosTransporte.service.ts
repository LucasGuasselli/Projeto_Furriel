import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { AuxilioTransporteDTO } from '../models/auxilioTransporte.dto';

@Injectable()
export class AuxiliosTransporteService {

  constructor(public http: HttpClient) { }

    retornarTodos(): Observable<AuxilioTransporteDTO[]> {
        return this.http.get<AuxilioTransporteDTO[]>(`${API_CONFIG.baseUrl}/auxiliosTransporte`);
    }

    retornarAuxilioTransportePorPrecCP(precCP: number): Observable<AuxilioTransporteDTO> {
      return this.http.get<AuxilioTransporteDTO>(
        `${API_CONFIG.baseUrl}/auxiliosTransporte/procurarAuxilioTransportePorPrecCP/?precCP=${precCP}`);
    }

    retornarAuxilioTransportePorId(id: number): Observable<AuxilioTransporteDTO> {
      return this.http.get<AuxilioTransporteDTO>(
        `${API_CONFIG.baseUrl}/auxiliosTransporte/${id}`);
    }

    inserir(obj: AuxilioTransporteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/auxiliosTransporte`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    editar(obj: AuxilioTransporteDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/auxiliosTransporte/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    atualizarAuxilioTransporte(): Observable<AuxilioTransporteDTO> {
      return this.http.get<AuxilioTransporteDTO>(
        `${API_CONFIG.baseUrl}/auxiliosTransporte/atualizarTodos`);
    }

    deletar(obj: AuxilioTransporteDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/auxiliosTransporte/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
