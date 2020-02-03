import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { SaqueAtrasadoDTO } from '../models/saqueAtrasado.dto';

@Injectable()
export class SaquesAtrasadosService {

  pagamentosAtrasados: SaqueAtrasadoDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<SaqueAtrasadoDTO[]> {
        return this.http.get<SaqueAtrasadoDTO[]>(`${API_CONFIG.baseUrl}/saquesAtrasados`);
    }

    findPagamentosAtrasadosByAditamentoId(id: number): Observable<SaqueAtrasadoDTO[]> {
      return this.http.get<SaqueAtrasadoDTO[]>(
          `${API_CONFIG.baseUrl}/saquesAtrasados/searchSaquesAtrasadosByAditamentoId/${id}`);
    }

    insert(obj: SaqueAtrasadoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/saquesAtrasados/insert`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

// saque atrasado com as regras de negocio da inclusao do auxilio transporte
    insertSaqueAtrasadoInclusao(obj: SaqueAtrasadoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/saquesAtrasados/insertSaqueAtrasadoInclusao`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: SaqueAtrasadoDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/saquesAtrasados/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: SaqueAtrasadoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/saquesAtrasados/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
