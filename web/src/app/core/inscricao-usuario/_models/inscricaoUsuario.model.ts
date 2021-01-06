import { Usuario } from "../../auth/_models/usurario.model";
import { ProcessoInscricao } from "../../processo-inscricao/_models/processoInscricao.model";
import { TransacaoInscricao } from "./transacaoInscricao.model";

export class InscricaoUsuario {
    id: number;
    dataInscricao: Date;
    status: string;
    usuarioId: number;
    processoInscricaoId: number;

    usuario: Usuario = new Usuario();
    processoInscricao: ProcessoInscricao = new ProcessoInscricao();
    transacaoInscricoes: TransacaoInscricao[];
}
