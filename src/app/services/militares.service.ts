import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { MilitarDTO } from '../models/militar.dto';
// na importacao automatica "Observable" e incompleta, a completa é / Rx
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MilitaresService {

  constructor(public http: HttpClient) { }

    retornarTodos(): Observable<MilitarDTO[]> {
        return this.http.get<MilitarDTO[]>(`${API_CONFIG.baseUrl}/militares`);
    }

    retornarMilitaresSemAuxilioTransporte(): Observable<MilitarDTO[]> {
      return this.http.get<MilitarDTO[]>(`${API_CONFIG.baseUrl}/militares/militaresSemAuxilioTransporte`);
    }

    retornarMilitaresComAuxilioTransporte(): Observable<MilitarDTO[]> {
      return this.http.get<MilitarDTO[]>(`${API_CONFIG.baseUrl}/militares/militaresComAuxilioTransporte`);
    }

    retornarMilitarPorPrecCP(precCP: number): Observable<MilitarDTO> {
        return this.http.get<MilitarDTO>(`${API_CONFIG.baseUrl}/militares/searchMilitarByPrecCP/?precCP=${precCP}`);
    }

    inserir(obj: MilitarDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/militares`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    editar(obj: MilitarDTO, precCP: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/militares/${precCP}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    deletar(obj: MilitarDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/militares/${obj.precCP}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
