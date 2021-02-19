export interface DataTableAcoes {
    evento: () => void;
    visivel?: (row) => boolean;
    icone: string;
    toolTip?: string;
    color?: string;
}
