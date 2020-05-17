import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NotificationModel} from '../../models/notification';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
                    250,
                    style({height: 0, opacity: 0, transform: 'translateX(100px)'}),
                ),
            ]),
            transition(':enter', [
                style({height: 0, opacity: 0, transform: 'translateX(100px)'}),
                animate(
                    250,
                    style({height: '*', opacity: 1, transform: 'translateX(0)'}),
                ),
            ]),
        ]),
    ],
    host: {'[@expand]': 'in'},
})
export class NotificationComponent {
    @Input() info: NotificationModel;
}
