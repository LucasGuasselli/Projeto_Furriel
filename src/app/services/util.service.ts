import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() { }

    formatDate(data: String) {
        return data.split('-').reverse().join('/');
    }

}
