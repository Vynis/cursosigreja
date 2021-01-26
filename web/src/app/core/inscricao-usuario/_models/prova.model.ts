import { ItemProva } from "./itemprova.model";

export class Prova {
    id: number;
    pergunta: string;
    tipoComponente: string;
    status: string;
    ordem: number;
    conteudoId: number;
    itensProvas: ItemProva[];
}
