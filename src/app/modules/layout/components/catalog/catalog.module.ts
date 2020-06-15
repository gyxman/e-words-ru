import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {InputRussianService} from '../../../exercises/services/input-russian.service';
import {CATALOG_ITEM_MANAGER_PLUGIN} from '../../tokens/catalog-item-manager-plugin.token';

@NgModule({
    imports: [CommonModule],
    declarations: [CatalogComponent],
    exports: [CatalogComponent],
    providers: [
        {
            provide: CATALOG_ITEM_MANAGER_PLUGIN,
            useClass: InputRussianService,
            multi: true,
        },
    ],
})
export class CatalogModule {}
