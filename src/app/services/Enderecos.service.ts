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
}
