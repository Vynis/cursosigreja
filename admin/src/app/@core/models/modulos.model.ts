import { ConteudoModel } from "./conteudos.model";
import { LiberacaoModuloModel } from "./liberacaoModulo.model";

export class ModuloModel {
    id: number;
    titulo: string;
    ordem: number;
    cursoId: number;
    conteudos: ConteudoModel[];
    liberacaoModulos: LiberacaoModuloModel[];
}
