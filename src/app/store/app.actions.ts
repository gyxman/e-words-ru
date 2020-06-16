import {createAction, props} from '@ngrx/store';
import {NotificationModel} from '../modules/utils/modules/notification/models/notification';

const showNotification = createAction(
    '[app] Показать нотификацию',
    props<{data: NotificationModel}>(),
);

export const appActions = {
    showNotification,
};
