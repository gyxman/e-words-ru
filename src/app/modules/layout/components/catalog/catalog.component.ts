import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CatalogItem} from '../../models/catalog-item';
import {Router} from '@angular/router';
import {LayoutRouteEnum} from '../../enums/layout-route.enum';
import {RouteEnum} from '../../../../enums/route.enum';
import {ComponentEnum} from '../../../exercises/enums/component.enum';

const items: CatalogItem[] = [
    {name: 'С английского на русский', component: ComponentEnum.InputRussian},
];

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
    readonly identityTrackByFunction = (_index: number, item: any) => item;

    constructor(private router: Router) {}

    items = items;

    onClick({component}: CatalogItem) {
        this.router.navigate([RouteEnum.User, LayoutRouteEnum.Start], {
            queryParams: {component},
        });
    }
}
