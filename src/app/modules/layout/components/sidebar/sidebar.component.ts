import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {SidebarFacadeService} from '../../services/sidebar-facade.service';

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

    readonly identityTrackByFunction = (_index: number, item: any) => item;
    readonly allMenuItems$ = this.sidebarFacadeService.allMenu$;

    constructor(private sidebarFacadeService: SidebarFacadeService) {}
}
