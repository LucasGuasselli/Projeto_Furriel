export class AuxilioTransporteDTO {
    id: number;
    militarPrecCP: number;
    valorTotalAT: number;
    valorDiarioAT: number;
    nome: String;
    graduacao: String;
    exclusao: Boolean = false;
    atualizacao: Boolean = true;
    atualizacaoTexto: String;
    entregaSPP: Boolean = false;
    entregaTexto: String;
}
