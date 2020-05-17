import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationModule} from '../notification/notification.module';
import {NotificationsComponent} from './notifications.component';
import {NotificationService} from '../../services/notification.service';

@NgModule({
    imports: [CommonModule, NotificationModule],
    declarations: [NotificationsComponent],
    providers: [NotificationService],
    exports: [NotificationsComponent],
})
export class NotificationsModule {}
