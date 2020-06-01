import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {LayoutFacadeService} from './services/layout-facade.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
    @ViewChild('sidebar') sidebar: MatSidenav;

    readonly showLoader$ = this.layoutFacadeService.showLoader$;

    constructor(private layoutFacadeService: LayoutFacadeService) {}
}
