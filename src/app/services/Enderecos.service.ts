// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

import { EnderecoDTO } from '../models/endereco.dto';

@Injectable()
export class EnderecosService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<EnderecoDTO[]> {
        return this.http.get<EnderecoDTO[]>(`${API_CONFIG.baseUrl}/enderecos`);
    }

    // buscando um endereco a partir de um militar
    findEnderecoByPrecCP(precCP: number): Observable<EnderecoDTO> {
        return this.http.get<EnderecoDTO>(`${API_CONFIG.baseUrl}/enderecos/searchEnderecoByPrecCP/?precCP=${precCP}`);
    }

    insert(obj: EnderecoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/enderecos`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }

    update(obj: EnderecoDTO, id: number) {
        return this.http.put(`${API_CONFIG.baseUrl}/enderecos/${id}`, obj,
              {
                observe: 'response',
                responseType: 'text'
              }
        );
    }
}
