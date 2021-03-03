import { Anexo } from "./anexo.model";
import { ConteudoUsuario } from "./conteudoUsuario.model";
import { Modulo } from "./modulos.model";
import { Prova } from "./prova.model";


export class Conteudo {
    id: number ;
    titulo: string ;
    ordem: number ;
    tipo: string ;
    descricao: string ;
    arquivo: string ;
    arquivoTxt: string ;
    dataPeriodoVisualizacaoIni: Date ;
    dataPeriodoVisualizacaoFim: Date ;
    definePeriodoVisualizacao: string ;
    minAcerto: number ;
    linkConteudoExterno: string ;
    moduloId: number;
    conteudoConcluido: boolean;
    modulo: Modulo;

    anexos: Anexo[];
    provas: Prova[];
}
