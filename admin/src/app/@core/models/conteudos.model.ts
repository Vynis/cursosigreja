import { AnexoModel } from "./anexo.model";
import { ModuloModel } from "./modulos.model";
import { ProvaModel } from "./prova.model";

export class ConteudoModel {
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
    modulo: ModuloModel;

    anexos: AnexoModel[];
    provas: ProvaModel[];


    constructor() {
       this.id = 0;
    }
}
