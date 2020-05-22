import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthFacadeService} from '../../../auth/services/auth-facade.service';
import {Router} from '@angular/router';
import {AuthRouteEnum} from '../../../auth/enums/auth-route.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    @Output() openSidebar = new EventEmitter();

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private authFacadeService: AuthFacadeService,
        private router: Router,
    ) {
        iconRegistry.addSvgIcon(
            'logout',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-logout.svg'),
        );
        iconRegistry.addSvgIcon(
            'toggle',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-toggle.svg'),
        );
    }

    signOut() {
        this.authFacadeService.signOut();
        this.router.navigate([AuthRouteEnum.Login]);
    }

    openMenu() {
        this.openSidebar.emit();
    }
}
