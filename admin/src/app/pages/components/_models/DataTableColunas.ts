export interface DataTableColunas {
    propriedade: string;
    titulo: string;
    valor?: (row) => string;
    disabled: boolean;
    cell?: (row) => string;
    usarImg?:boolean;
    urlImg?:string;
    maxwidth?:number;
}
