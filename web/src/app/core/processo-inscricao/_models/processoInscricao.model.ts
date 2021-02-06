import { NumberFormatStyle } from "@angular/common";
import { Curso } from "./curso.model";

export class ProcessoInscricao {
    id: number;
    dataInicial: Date;
    dataFinal: Date;
    configuraPeriodo: string;
    tipo: string;
    status: string;
    cursoId: number;
    curso: Curso = new Curso();
    valor: number;
    dataInicalPagto: Date;
    dataFinalPagto: Date;
}
