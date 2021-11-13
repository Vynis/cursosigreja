export class ActionsTableModel {
    position: string;
    columnTitle: string;
    add: boolean;
    edit: boolean;
    delete: boolean;
    custom: any;

    constructor() {
     this.position = 'right';
     this.columnTitle = 'Ações';
     this.add = false;
     this.edit = false;
     this.delete = false;
    }
}