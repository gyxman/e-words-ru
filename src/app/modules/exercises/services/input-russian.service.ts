import {Injectable} from '@angular/core';
import {CatalogItemManagerPlugin} from '../../layout/interfaces/catalog-item-manager-plugin';
import {ComponentEnum} from '../enums/component.enum';
import {CatalogItem} from '../../layout/models/catalog-item';

@Injectable()
export class InputRussianService implements CatalogItemManagerPlugin {
    getItem(): CatalogItem {
        return {name: 'С английского на русский', component: ComponentEnum.InputRussian};
    }
}
