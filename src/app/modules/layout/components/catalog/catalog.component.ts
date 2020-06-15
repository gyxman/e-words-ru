import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CatalogItem} from '../../models/catalog-item';
import {Router} from '@angular/router';
import {LayoutRouteEnum} from '../../enums/layout-route.enum';
import {RouteEnum} from '../../../../enums/route.enum';
import {CATALOG_ITEM_MANAGER_PLUGIN} from '../../tokens/catalog-item-manager-plugin.token';
import {CatalogItemManagerPlugin} from '../../interfaces/catalog-item-manager-plugin';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
    readonly identityTrackByFunction = (_index: number, item: any) => item;

    constructor(
        private router: Router,
        @Inject(CATALOG_ITEM_MANAGER_PLUGIN)
        private readonly catalogItemManagerPlugins: CatalogItemManagerPlugin[],
    ) {}

    items = this.catalogItemManagerPlugins.map(item => item.getItem());

    onClick({component}: CatalogItem) {
        this.router.navigate([RouteEnum.User, LayoutRouteEnum.Start], {
            queryParams: {component},
        });
    }
}
