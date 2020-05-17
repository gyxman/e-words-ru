import {Injectable} from '@angular/core';
import {NotificationModel} from '../models/notification';
import {NotificationService} from './notification.service';

@Injectable()
export class NotificationFacadeService {
    constructor(private notificationService: NotificationService) {}

    showNotification(info: NotificationModel) {
        this.notificationService.addNotification(info);
    }
}
