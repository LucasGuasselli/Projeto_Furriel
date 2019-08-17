export class DespesaDTO {
    id: number;
    aditamentoId: number;
    militarPrecCP: number;
    nome: String;
    graduacao: String;
    dataInicio: String;
    dataFim: String;
    quantidadeDias = 0;
    valor = 0;
    valorTotal: number = this.valor;
    motivo = 'não houve despesa';
    calculoDataInicio: Date;
    calculoDataFim: Date;
    // tslint:disable-next-line:no-inferrable-types
    feriados: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    administrativos: number = 0;
}
