import { ItemProvaUsuario } from "./itemprovaUsuario.model";

export class ProvaUsuario {
    id: number;
    dataCadastro?: Date;
    perguntaTexto: string;
    usuarioId: number;
    provaId: number;
    itemProvaUsuarios: ItemProvaUsuario[];
}
