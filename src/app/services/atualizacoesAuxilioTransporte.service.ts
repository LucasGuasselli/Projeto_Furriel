import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AtualizacaoAuxilioTransporteDTO } from '../models/atualizacaoAuxilioTransporte.dto';

@Injectable()
export class AtualizacoesAuxilioTransporteService {

  atualizacoesAuxilioTransporte: AtualizacaoAuxilioTransporteDTO;

  constructor(public http: HttpClient) { }

    retornarTodos(): Observable<AtualizacaoAuxilioTransporteDTO[]> {
        return this.http.get<AtualizacaoAuxilioTransporteDTO[]>(`${API_CONFIG.baseUrl}/alteracoesValoresPassagens`);
    }

    retornarAtualizacoesPorAditamentoId(id: number): Observable<AtualizacaoAuxilioTransporteDTO[]> {
      return this.http.get<AtualizacaoAuxilioTransporteDTO[]>(
          `${API_CONFIG.baseUrl}/alteracoesValoresPassagens/procurarAlteracoesPorAditamentoId/${id}`);
    }

    inserir(obj: AtualizacaoAuxilioTransporteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/alteracoesValoresPassagens`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    editar(obj: AtualizacaoAuxilioTransporteDTO, id: number) {
      return this.http.put(`${API_CONFIG.baseUrl}/alteracoesValoresPassagens/${id}`, obj,
            {
              observe: 'response',
              responseType: 'text'
            }
      );
    }

    deletar(obj: AtualizacaoAuxilioTransporteDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/alteracoesValoresPassagens/${obj.id}`,
            {
              observe: 'response',
              responseType: 'text'
            }
        );
    }

}
