import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'logout',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-logout.svg'),
        );
        iconRegistry.addSvgIcon(
            'toggle',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-toggle.svg'),
        );
    }
}
