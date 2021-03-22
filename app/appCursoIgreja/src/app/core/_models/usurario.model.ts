
export class Usuario {

    Usuario() {
        this.tipoAcesso = 'E';
    }

    id: number;
    nome: string;
    email: string;
    senha: string;
    status: string;
    dataCadastro: Date;
    cpf: string;
    dataNascimento: Date;
    rua: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    cep: string;
    telefoneCelular: string;
    telefoneFixo: string;
    congregacaoId: number;
    tipoAcesso: string;

    congregaHaQuantoTempo: string;
    recebePastoreiro: string;
    quemPastoreia: string;
    frequentaCelula: string;
    quemLider: string;
    dadosComp: boolean;
}
