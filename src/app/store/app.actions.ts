import {createAction, props} from '@ngrx/store';
import {NotificationModel} from '../modules/utils/modules/notification/models/notification';
import {Word} from '../modules/words/models/word';

const getWordsStart = createAction('[app] Начать загрузку слов из базы данных');

const getWordsSuccess = createAction(
    '[app] Загрузка слов упешно завершена',
    props<{data: Word[]}>(),
);

const getWordsError = createAction('[app] Загрузка слов завершилась ошибкой');

const showNotification = createAction(
    '[app] Показать нотификацию',
    props<{data: NotificationModel}>(),
);

export const appActions = {
    showNotification,
    getWordsStart,
    getWordsSuccess,
    getWordsError,
};
