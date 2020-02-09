import { EnderecoDTO } from "./endereco.dto";

export class MilitarDTO {
    precCP: number;
    postoGraduacaoId: number = null;
    nome: String;
    endereco: EnderecoDTO = new EnderecoDTO();
}
