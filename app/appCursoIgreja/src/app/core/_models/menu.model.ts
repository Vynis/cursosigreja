export class MenuModel {
    titulo: string;
    url: string;
    icon: string;
    open: boolean;
    children: MenuModel[];
    conteudoConcluido: boolean;

    constructor() {
        this.open = false;
        this.conteudoConcluido = false;
    }
}
