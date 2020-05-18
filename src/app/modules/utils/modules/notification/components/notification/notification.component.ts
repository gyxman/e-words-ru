import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {NotificationModel} from '../../models/notification';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('expand', [
            state('in', style({height: '*'})),
            transition(':leave', [
                style({height: '*'}),
                animate(
                    200,
                    style({height: 0, opacity: 0, transform: 'translateX(110%)'}),
                ),
            ]),
            transition(':enter', [
                style({height: 0, opacity: 0, transform: 'translateX(110%)'}),
                animate(
                    200,
                    style({height: '*', opacity: 1, transform: 'translateX(0)'}),
                ),
            ]),
        ]),
    ],
})
export class NotificationComponent {
    @HostBinding('@expand') readonly expand;

    @Input() info: NotificationModel;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'success',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/notifications/icon-success.svg',
            ),
        );
        iconRegistry.addSvgIcon(
            'warning',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/notifications/icon-warning.svg',
            ),
        );
        iconRegistry.addSvgIcon(
            'error',
            sanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/notifications/icon-error.svg',
            ),
        );
    }

    get classes() {
        const {type} = this.info;

        return {
            [`wrapper_${type}`]: true,
        };
    }
}
