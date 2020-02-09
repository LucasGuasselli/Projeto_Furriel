export class EnderecoDTO {
    id: number;
    militarPrecCP: number;
    logradouro: String;
    bairro: String;
    localidade: String;
    numero: number;
    complemento: String = 'não possui';
}
