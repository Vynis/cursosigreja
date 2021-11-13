import { FiltroItemModel } from "./filtroItem.model";

export class PaginationfilterModel {
    take: number;
    skip: number;
    filtro: FiltroItemModel[] = [];
}
