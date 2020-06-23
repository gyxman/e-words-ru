import {createAction, props} from '@ngrx/store';
import {Word} from '../models/word';

const getWordsStart = createAction('[words] Начать загрузку слов из базы данных');

const getWordsSuccess = createAction(
    '[words] Загрузка слов упешно завершена',
    props<{data: Word[]}>(),
);

const getWordsError = createAction('[words] Загрузка слов завершилась ошибкой');

const addWordStart = createAction(
    '[words] Начать добавление нового слова',
    props<{data: Omit<Word, 'id'>}>(),
);

const addWordSuccess = createAction('[words] Новое слово успешно добавлено');

const addWordError = createAction('[words] Ошибка при добавлении нового слова');

export const wordsActions = {
    getWordsStart,
    getWordsSuccess,
    getWordsError,
    addWordStart,
    addWordSuccess,
    addWordError,
};
