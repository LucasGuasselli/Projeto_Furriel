import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() { }

    formatDate(data: String) {
        const texto: String = data.trim().substring(4, 15);
        const dia: String = texto.substring(4, 6);
        const mes: String = this.returnNumMonth(texto.substring(0, 3));
        const ano: String = texto.substring(7, 11);
        const resultado: String = (dia + '/' + mes + '/' + ano);
        return resultado;  // .split('-').reverse().join('/');
    }

    returnNumMonth(month: String) {
        // tslint:disable-next-line:triple-equals
        if (month == 'Jan') {
            return month = '01';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Feb') {
            return month = '02';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Mar') {
            return month = '03';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Apr') {
            return month = '04';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'May') {
            return month = '05';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Jun') {
            return month = '06';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Jul') {
            return month = '07';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Aug') {
            return month = '08';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Sep') {
            return month = '09';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Oct') {
            return month = '10';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Nov') {
            return month = '11';
        // tslint:disable-next-line:triple-equals
        } else if (month == 'Dec') {
            return month = '12';
        }
    }
}
