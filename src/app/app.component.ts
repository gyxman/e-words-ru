import {Component} from '@angular/core';
import {NotificationFacadeService} from './modules/utils/modules/notification/services/notification-facade.service';
import {NotificationModel} from './modules/utils/modules/notification/models/notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    title = 'e-words-ru';

    constructor(private notificationService: NotificationFacadeService) {}

    addNotification(info: NotificationModel) {
        this.notificationService.showNotification(info);
    }
}
