// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

import { PostoGraduacaoDTO } from '../models/postoGraduacao.dto';

@Injectable()
export class PostosGraduacoesService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<PostoGraduacaoDTO[]> {
        return this.http.get<PostoGraduacaoDTO[]>(`${API_CONFIG.baseUrl}/postosGraduacoes`);
    }

    findPostoGraduacaoById(id: number): Observable<PostoGraduacaoDTO> {
        return this.http.get<PostoGraduacaoDTO>(`${API_CONFIG.baseUrl}/postosGraduacoes/${id}`);
    }
}
