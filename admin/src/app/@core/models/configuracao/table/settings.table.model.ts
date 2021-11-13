import {ActionsTableModel} from './actions.table.model';
import { DeleteTableModel } from './delete.table.model';
import { EditTableModel } from './edit.table.model';

export class SettingsTableModel {
  hideSubHeader: boolean;
  noDataMessage: string;
  actions: ActionsTableModel;
  edit: EditTableModel;
  delete: DeleteTableModel;
  columns: any;
  selectMode: string = '';

  constructor() {
      this.hideSubHeader = true;
      this.noDataMessage = 'Não há nehum dado para exibir';
      this.actions = new ActionsTableModel();
      this.edit = new EditTableModel();
      this.delete = new DeleteTableModel();
  }
}