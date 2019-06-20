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
       let contador = 0;
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
                        // caso informem datas muito distantes
                        if (inicio.getDate() !== fim.getDate() && (inicio.getDate() + 1) !== fim.getDate()) {
                                fim.setDate(inicio.getDate() + 1 );
                        }
                        break;
                }
                case 'Dispensa como Recompensa': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;
                    // tslint:disable-next-line:max-line-length
                    }while ( inicio.getDate() <= fim.getDate() && quantidadeDias < 22 || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) && quantidadeDias < 22);
                        inicio.setDate(inicio.getDate() - contador);
                        quantidadeDias -= feriados + administrativos;
                            // evitando que o usuario avacalhe nos feriados e administrativos
                            if ( quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Viagem': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate() && quantidadeDias < 22 || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) && quantidadeDias < 22);
                            inicio.setDate(inicio.getDate() - contador);
                                quantidadeDias -= feriados + administrativos;
                            // tirando a passagem que gasta até o quartel e depois para retornar
                            if ( quantidadeDias > 0) { quantidadeDias -= 1; }
                            // evitando que o usuario avacalhe nos feriados e administrativos
                            if ( quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Desconto em Ferias': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            this.inicio.setDate(inicio.getDate() + 1);
                               contador += 1;
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate() && quantidadeDias < 22 || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) && quantidadeDias < 22);
                            inicio.setDate(inicio.getDate() - contador);
                                quantidadeDias -= feriados + administrativos;
                            // evitando que o usuario avacalhe nos feriados e administrativos
                            if (quantidadeDias < 0 ) {
                                quantidadeDias = 0;
                            }
                    break;
                }

                case 'Nupcias': {
                        // caso informem datas com diferenca maior que 7 dias
                        if ((inicio.getDate() + 7) !== (fim.getDate())) {
                            fim.setDate(inicio.getDate() + 7 );
                        }
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate() && quantidadeDias < 8 || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) && quantidadeDias < 8);
                            inicio.setDate(inicio.getDate() - contador);
                                quantidadeDias -= feriados + administrativos;
                        // evitando que o usuario avacalhe nos feriados e administrativos
                        if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'LTSP': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;
                    // tslint:disable-next-line:max-line-length
                    }while ( inicio.getDate() <= fim.getDate() && quantidadeDias < 22 || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) && quantidadeDias < 22);
                        inicio.setDate(inicio.getDate() - contador);
                            quantidadeDias -= feriados + administrativos;
                            // tirando a passagem que gasta até o quartel e depois para retornar
                            if (quantidadeDias > 0) { quantidadeDias -= 1; }
                            // evitando que o usuario avacalhe nos feriados e administrativos
                            if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Ferias': {

                    break;
                }
            }

        return quantidadeDias;
    }
}
