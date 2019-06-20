import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() { }

    inicio: Date = new Date();
    fim: Date = new Date();

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

    calculaQuantidadeDias(inicio: Date, fim: Date, motivo: String, feriados: number, administrativos: number) {
       // tslint:disable-next-line:prefer-const
       let quantidadeDias = 0;
       this.inicio.setDate(inicio.getDate());
       this.fim.setDate(fim.getDate());

            switch (motivo) {
                case 'Serviço': {
                    console.log(inicio.toString().substring(0, 3));
                    if (inicio.toString().substring(0, 3) === 'Sat' || feriados >= 1 || administrativos >= 1) {
                        quantidadeDias = -1;
                    } else if (inicio.toString().substring(0, 3) === 'Fri' || inicio.toString().substring(0, 3) === 'Sun') {
                        quantidadeDias = 0;
                    } else {
                        quantidadeDias = 1;
                    }
                        break;
                }
                case 'Dispensa como Recompensa': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (this.inicio.toString().substring(0, 3) === 'Mon' || this.inicio.toString().substring(0, 3) === 'Tue' ||  this.inicio.toString().substring(0, 3) === 'Wed' || this.inicio.toString().substring(0, 3) === 'Thu' || this.inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            this.inicio.setDate(this.inicio.getDate() + 1);
                    }while ( this.inicio.getDate() <= this.fim.getDate() && quantidadeDias < 23);
                        quantidadeDias -= feriados + administrativos;
                            console.log(quantidadeDias);
                    break;
                }

            }

        return quantidadeDias;
    }
}
