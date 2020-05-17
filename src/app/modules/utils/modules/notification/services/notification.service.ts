import {Injectable} from '@angular/core';
import {NotificationModel} from '../models/notification';
import {Subject} from 'rxjs';

@Injectable()
export class NotificationService {
    notificationsStream$: Subject<NotificationModel> = new Subject();

    addNotification(info: NotificationModel) {
        this.notificationsStream$.next(info);
    }
}
