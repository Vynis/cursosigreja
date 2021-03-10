
import { ProcessoInscricao } from "./processoInscricao.model";
import { TransacaoInscricao } from "./transacaoInscricao.model";
import { Usuario } from "./usurario.model";

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
