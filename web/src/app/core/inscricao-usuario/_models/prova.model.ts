import { ItemProva } from "./itemprova.model";
import { ProvaUsuario } from "./provaUsuario.model";

export class Prova {
    id: number;
    pergunta: string;
    tipoComponente: string;
    status: string;
    ordem: number;
    conteudoId: number;
    itensProvas: ItemProva[];
    provaUsuarios: ProvaUsuario[];
}
