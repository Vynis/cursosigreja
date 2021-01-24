import { Anexo } from "./anexo.model";


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

    anexos: Anexo[];  
}
