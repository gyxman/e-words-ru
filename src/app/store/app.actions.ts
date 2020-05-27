import {createAction, props} from '@ngrx/store';
import {NotificationModel} from '../modules/utils/modules/notification/models/notification';

const showNotification = createAction(
    '[auth] Показать нотификацию',
    props<{data: NotificationModel}>(),
);

export const appActions = {
    showNotification,
};
