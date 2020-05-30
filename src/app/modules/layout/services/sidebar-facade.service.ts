import {Injectable} from '@angular/core';
import {LayoutRouteEnum} from '../enums/layout-route.enum';
import {SidebarMenuItem} from '../models/sidebar-menu-item';
import {Observable, of} from 'rxjs';

type SidebarMenuItemWithKey = Readonly<{
    [key: string]: SidebarMenuItem;
}>;

const menuItems: SidebarMenuItemWithKey = {
    addWord: {
        title: 'Добавить слово',
        key: 'addWord',
        navigateTo: LayoutRouteEnum.AddWord,
    },
    catalog: {
        title: 'Каталог упражнений',
        key: 'catalog',
        navigateTo: LayoutRouteEnum.Catalog,
    },
};

const sortedMenuItems = ['addWord', 'catalog'];

@Injectable()
export class SidebarFacadeService {
    readonly allMenu$: Observable<SidebarMenuItem[]> = of(
        sortedMenuItems.map(key => menuItems[key]),
    );
}
