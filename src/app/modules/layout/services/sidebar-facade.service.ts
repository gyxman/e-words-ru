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
};

const sortedMenuItems = ['addWord'];

@Injectable()
export class SidebarFacadeService {
    readonly allMenu$: Observable<SidebarMenuItem[]> = of(
        sortedMenuItems.map(key => menuItems[key]),
    );
}
