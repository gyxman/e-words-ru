import {createAction, props} from '@ngrx/store';
import {Word} from '../../words/models/word';

const getWordsStart = createAction('[layout] Начать загрузку слов из базы данных');

const getWordsSuccess = createAction(
    '[layout] Загрузка слов упешно завершена',
    props<{data: Word[]}>(),
);

const getWordsError = createAction('[app] Загрузка слов завершилась ошибкой');

export const layoutActions = {
    getWordsStart,
    getWordsSuccess,
    getWordsError,
};
