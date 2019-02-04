export class Desconto {
        codDesconto: number;
        precCP: number;
        dataInicio: Date;
        dataFim: Date;
        valorDesconto: number;
        motivo: string;

        getDataInicio() {
                return this.dataInicio;
        }
        getDataFim() {
                return this.dataFim;
        }
}
