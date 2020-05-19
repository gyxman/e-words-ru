import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {NotificationModel} from '../../models/notification';
import {NotificationComponent} from '../notification/notification.component';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NotificationsComponent {
    @ViewChild('notificationContainer', {read: ViewContainerRef})
    notificationContainer: ViewContainerRef;

    components: {[key: number]: any} = {};
    componentRef: any;

    notificationStream$ = this.notificationService.notificationsStream$.pipe(
        tap(info => {
            this.createComponent(info);
        }),
    );

    constructor(
        private notificationService: NotificationService,
        private resolver: ComponentFactoryResolver,
    ) {}

    private createComponent(notification: NotificationModel) {
        const factory = this.resolver.resolveComponentFactory(NotificationComponent);
        const id = Date.now();

        this.componentRef = this.notificationContainer.createComponent(factory);
        this.componentRef.instance.info = notification;

        this.components[id] = this.componentRef.hostView;

        setTimeout(() => {
            this.removeComponent(id);
        }, notification.time || 3000);
    }

    private removeComponent(index: number) {
        const componentRef = this.components[index];
        const componentIndex: number = this.notificationContainer.indexOf(componentRef);

        this.notificationContainer.remove(componentIndex);
        delete this.components[index];
    }
}
