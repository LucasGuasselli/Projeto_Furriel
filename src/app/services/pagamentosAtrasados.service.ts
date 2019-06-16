import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { PagamentoAtrasadoDTO } from '../models/pagamentoAtrasado.dto';

@Injectable()
export class PagamentosAtrasadosService {

  pagamentosAtrasados: PagamentoAtrasadoDTO;

  constructor(public http: HttpClient) { }

    // retorna todos militares cadastrados
    findAll(): Observable<PagamentoAtrasadoDTO[]> {
        return this.http.get<PagamentoAtrasadoDTO[]>(`${API_CONFIG.baseUrl}/pagamentosAtrasados`);
    }

    findPagamentosAtrasadosByAditamentoId(id: number): Observable<PagamentoAtrasadoDTO[]> {
      return this.http.get<PagamentoAtrasadoDTO[]>(
          `${API_CONFIG.baseUrl}/pagamentosAtrasados/searchPagamentosAtrasadosByAditamentoId/${id}`);
    }

    insert(obj: PagamentoAtrasadoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/pagamentosAtrasados`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: PagamentoAtrasadoDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/pagamentosAtrasados/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    delete(obj: PagamentoAtrasadoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/pagamentosAtrasados/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
