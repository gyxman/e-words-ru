import {CatalogItem} from '../models/catalog-item';

export interface CatalogItemManagerPlugin {
    getItem(): CatalogItem;
}
