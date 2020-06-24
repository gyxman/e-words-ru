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

const addWordSuccess = createAction(
    '[words] Новое слово успешно добавлено',
    props<{data: Word}>(),
);

const addWordError = createAction('[words] Ошибка при добавлении нового слова');

const removeWordStart = createAction(
    '[words] Начать удаление слова',
    props<{wordId: string}>(),
);

const removeWordSuccess = createAction(
    '[words] Слово успешно удалено',
    props<{wordId: string}>(),
);

const removeWordError = createAction('[words] Ошибка при удалении слова');

export const wordsActions = {
    getWordsStart,
    getWordsSuccess,
    getWordsError,
    addWordStart,
    addWordSuccess,
    addWordError,
    removeWordStart,
    removeWordSuccess,
    removeWordError,
};
