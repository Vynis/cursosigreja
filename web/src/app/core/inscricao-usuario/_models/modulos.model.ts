import { Conteudo } from "./conteudos.model";
import { LiberacaoModulo } from "./liberacaoModulo.model";


export class Modulo {
    id: number;
    titulo: string;
    ordem: number;
    cursoId: number;
    conteudos: Conteudo[];
    liberacaoModulos: LiberacaoModulo[];
}
