import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {SidebarFacadeService} from '../../services/sidebar-facade.service';
import {SidebarMenuItem} from '../../models/sidebar-menu-item';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
    @Output() sidebarOnClick = new EventEmitter();

    @HostListener('click') onClick() {
        this.sidebarOnClick.emit();
    }

    readonly allMenuItems: SidebarMenuItem[] = this.sidebarFacadeService.allMenu;

    constructor(private sidebarFacadeService: SidebarFacadeService) {}
}
