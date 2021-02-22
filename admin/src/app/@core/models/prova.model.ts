import { ItemProvaModel } from "./itemprova.model";

export class ProvaModel {
    id: number;
    pergunta: string;
    tipoComponente: string;
    status: string;
    ordem: number;
    conteudoId: number;
    itensProvas: ItemProvaModel[];
}
