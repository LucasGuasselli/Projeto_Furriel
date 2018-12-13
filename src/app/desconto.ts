export class Desconto {
        codDesconto: number;
        codMilitar: number;
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
