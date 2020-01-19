import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() { }

    // inicio: Date = new Date();
    // fim: Date = new Date();
    

    // retornando uma data no formado dd/mm/yyyy
    formatDate(data: String) {
        // retirando os espacos da string
            const texto: String = data.trim().substring(4, 15);
        const dia: String = texto.substring(4, 6);
        const mes: String = this.returnNumMonth(texto.substring(0, 3));
        const ano: String = texto.substring(7, 11);
        const resultado: String = (dia + '/' + mes + '/' + ano);
        // .split('-').reverse().join('/');
            return resultado;  
    }

// calcula a quantidade de dias que devem ser descontados conforme o motivo do desconto (regras de negócio).
// os feriados e administrativos sao variaveis do tipo number que sao subtraidos da quantidade total de dias pois ja foram descontados separadamente.
    calculaQuantidadeDias(inicio: Date, fim: Date, motivo: String, feriados: number, administrativos: number) {
       // tslint:disable-next-line:prefer-const
       let quantidadeDias = 0;
       // contador utilizado para evitar loopings desnecessarios
       let contador = 0;

            switch (motivo) {
                case 'Serviço': {
                    // abate um dia de desconto
                    if (inicio.toString().substring(0, 3) === 'Sat' || feriados >= 1 || administrativos >= 1) {
                        quantidadeDias = -1;

                        // nao desconta, somente registra o evento
                    } else if (inicio.toString().substring(0, 3) === 'Fri' || inicio.toString().substring(0, 3) === 'Sun') {
                        quantidadeDias = 0;

                        // desconta um dia
                    } else {                       
                        quantidadeDias = 1;
                    }

                       // caso informem datas muito distantes pois o servico se tira de um dia para o outro nao podendo tirar dois dias seguidos (regra de negocio)
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
                        // percorrendo o periodo informado do inicio ao fim
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;

                                if (quantidadeDias > 25) { break; }

                    // tslint:disable-next-line:max-line-length
                    }while ( inicio.getDate() <= fim.getDate()  || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                        // retornando a data inicio para o informado por parametro // VERIFICAR SE NECESSARIO
                        inicio.setDate(inicio.getDate() - contador);
                        // VERIFICAR SE PODE SER OTIMIZADA ESTA VALIDACAO
                            if ( quantidadeDias > 23 ) { quantidadeDias = 22; }
                            // retirando os feriados e administrativos ja descontados do militar
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

                                if (quantidadeDias > 25) { break; }
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate()  || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                            inicio.setDate(inicio.getDate() - contador);
                                if ( quantidadeDias > 23 ) { quantidadeDias = 22; }
                                    quantidadeDias -= feriados + administrativos;
                                        // tirando a passagem que gasta até o quartel e depois para retornar (regra de negocio).
                                        if ( quantidadeDias > 0) { quantidadeDias -= 1; }
                                        // evitando que o usuario avacalhe (data inicio posterior a data fim) nos feriados e administrativos.
                                        if ( quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Desconto em Ferias': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                           inicio.setDate(inicio.getDate() + 1);
                               contador += 1;

                               if (quantidadeDias > 25) { break; }
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate()  || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                            
                            inicio.setDate(inicio.getDate() - contador);
                                if ( quantidadeDias > 23 ) { quantidadeDias = 22; }

                                    quantidadeDias -= feriados + administrativos;
                                        if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Nupcias': {
                        // caso informem datas com diferenca maior que 7 dias (regra de negocio - 8 dias de dispensa).
                        if ((inicio.getDate() + 7) !== (fim.getDate())) {
                            fim.setMonth(inicio.getMonth());
                            fim.setDate(inicio.getDate() + 7 );
                        }
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                                contador += 1;

                                if (quantidadeDias > 25) { break; }
                        // tslint:disable-next-line:max-line-length
                        } while ( inicio.getDate() <= fim.getDate()  || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                            
                            inicio.setDate(inicio.getDate() - contador);
                                if ( quantidadeDias > 23 ) { quantidadeDias = 22; }

                                    quantidadeDias -= feriados + administrativos;
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

                                if (quantidadeDias > 25) { break; }
                    // tslint:disable-next-line:max-line-length
                    }while ( inicio.getDate() <= fim.getDate()  || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                        
                        inicio.setDate(inicio.getDate() - contador);
                            if ( quantidadeDias > 23 ) { quantidadeDias = 22; }

                                quantidadeDias -= feriados + administrativos;
                                    // tirando a passagem que gasta até o quartel e depois para retornar
                                    if (quantidadeDias > 0) { quantidadeDias -= 1; }
                                    if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Ferias': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                               contador += 1;
                            
                            if (quantidadeDias > 25) { break; }
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.getDate() <= fim.getDate() || inicio.toString().substring(4, 7) !== fim.toString().substring(4, 7) );
                      
                            inicio.setDate(inicio.getDate() - contador);
                                if ( quantidadeDias > 23 ) { quantidadeDias = 22; }
                             
                                quantidadeDias -= feriados + administrativos;
                            if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }

                case 'Administrativo': {
                    // tslint:disable-next-line:max-line-length
                    if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                        quantidadeDias = 1;
                    }
                        break;
                }

                case 'Feriado': {
                    // tslint:disable-next-line:max-line-length
                    if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                        quantidadeDias = 1;
                    }
                        break;
                }

                // o case deve calcular a quantidade de dias restantes do mes a partir da data de inclusao do auxilio Transporte e somar mais 22 dias conforme regra de negocio                
                case 'Saque Atrasado': {
                    do {
                        // tslint:disable-next-line:max-line-length
                        if (inicio.toString().substring(0, 3) === 'Mon' || inicio.toString().substring(0, 3) === 'Tue' ||  inicio.toString().substring(0, 3) === 'Wed' || inicio.toString().substring(0, 3) === 'Thu' || inicio.toString().substring(0, 3) === 'Fri') {
                            quantidadeDias += 1;
                        }
                            inicio.setDate(inicio.getDate() + 1);
                               contador += 1;
                          //   console.log(inicio.getDate());
                          //   console.log(fim.getDate());    
                               if (quantidadeDias > 25) { break; }
                        // tslint:disable-next-line:max-line-length
                        }while ( inicio.toString().substring(4, 7) == fim.toString().substring(4, 7) );
                          
                            inicio.setDate(inicio.getDate() - contador);
                                if ( quantidadeDias > 23 ) { quantidadeDias = 22; }
                            // adicionando +22 dias que e o proximo mes sem receber (regra de negocio).    
                                quantidadeDias += 22;
                            if (quantidadeDias < 0 ) { quantidadeDias = 0; }
                    break;
                }
            }

        return quantidadeDias;
    }

    // retorna o numero correspondente ao mes (parametro) 
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

    //retorna o nome correspondente ao mes (parametro). Retorna o mes referente a inclusao do auxilio transporte e o proximo (regra de negocio).
      returnNameMonth(data: String) {
        const texto: String = data.trim().substring(4, 15);

        // tslint:disable-next-line:triple-equals
        if (texto.substring(0, 3) == 'Jan') {
            return 'Janeiro e Fevereiro';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Feb') {
            return 'Fevereiro e Março';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Mar') {
            return 'Março e Abril';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Apr') {
            return 'Abril e Maio';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'May') {
            return 'Maio e Junho';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Jun') {
            return 'Junho e Julho';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Jul') {
            return 'Julho e Agosto';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Aug') {
            return 'Agosto e Setembro';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Sep') {
            return 'Setembro e Outubro';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Oct') {
            return 'Outubro e Novembro';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Nov') {
            return 'Novembro e Dezembro';
        // tslint:disable-next-line:triple-equals
        } else if (texto.substring(0, 3) == 'Dec') {
            return 'Dezembro e Janeiro';
        }
    }

}
