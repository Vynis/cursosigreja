import { ModuloModel } from "./modulos.model";

export class CursoModel {
    id: number ;
    titulo: string ;
    dataCadastro: Date ;
    status: string ;
    descricao: string ;
    cargaHoraria: string ;
    arquivoImg: string;
    modulo: ModuloModel[];
    
    /**
     *
     */
    constructor() {
        this.status = 'A';        
    }
}
