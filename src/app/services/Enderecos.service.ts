// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { API_CEP } from '../config/api.cep';

import { EnderecoDTO } from '../models/endereco.dto';

@Injectable()
export class EnderecosService {

    constructor(public http: HttpClient) { }

    retornarTodos(): Observable<EnderecoDTO[]> {
        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.baseUrl}/enderecos`);
    }

    retornarEnderecoPorCEP(cep: String): Observable<EnderecoDTO> {
        return this.http.get<EnderecoDTO>(`${API_CEP.baseUrl}${cep}/json`);
    }

    // buscando um endereco a partir de um militar
    retornarEnderecoPorPrecCP(precCP: number): Observable<EnderecoDTO> {
        return this.http.get<EnderecoDTO>(`${API_CONFIG.baseUrl}/enderecos/searchEnderecoByPrecCP/?precCP=${precCP}`);
    }

    inserir(obj: EnderecoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/enderecos`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    atualizar(obj: EnderecoDTO, id: number) {
        return this.http.put(`${API_CONFIG.baseUrl}/enderecos/${id}`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }
}
