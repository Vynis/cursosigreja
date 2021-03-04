export class MenuModel {
    titulo: string;
    url: string;
    icon: string;
    open: boolean;
    children: MenuModel[];
    conteudoConcluido: boolean;
    idModulo?: number;
    idConteudo?: number;

    constructor() {
        this.open = false;
        this.conteudoConcluido = false;
    }
}
