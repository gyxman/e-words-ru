import {InjectionToken} from '@angular/core';
import {CatalogItemManagerPlugin} from '../interfaces/catalog-item-manager-plugin';

export const CATALOG_ITEM_MANAGER_PLUGIN = new InjectionToken<CatalogItemManagerPlugin>(
    '[Каталог упражнений] Провайдер для карточки каталога упражнений',
);
