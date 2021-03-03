import { Conteudo } from "./conteudos.model";

export class ConteudoUsuario {
    id: number ;
    concluido: string ;
    dataConclusao: Date ;
    conteudoId: number;
    usuariosId: number;

    conteudo: Conteudo;
}
