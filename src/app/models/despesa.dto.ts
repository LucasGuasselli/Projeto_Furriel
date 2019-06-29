export class DespesaDTO {
    id: number;
    aditamentoId: number;
    militarPrecCP: number;
    nome: String;
    graduacao: String;
    dataInicio: String;
    dataFim: String;
    quantidadeDias: number;
    valor: number;
    valorTotal: number = this.valor;
    motivo: string;
    calculoDataInicio: Date;
    calculoDataFim: Date;
    // tslint:disable-next-line:no-inferrable-types
    feriados: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    administrativos: number = 0;
}
