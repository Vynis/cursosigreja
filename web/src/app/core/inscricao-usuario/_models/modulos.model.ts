import { Conteudo } from "./conteudos.model";


export class Modulo {
    id: number;
    titulo: string;
    ordem: number;
    cursoId: number;
    conteudos: Conteudo[];
}
