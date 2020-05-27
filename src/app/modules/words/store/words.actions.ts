import {createAction, props} from '@ngrx/store';
import {Word} from '../models/word';

const addWordStart = createAction(
    '[words] Начать добавление нового слова',
    props<{data: Word}>(),
);

const addWordSuccess = createAction('[words] Новое слово успешно добавлено');

const addWordError = createAction('[words] Ошибка при добавлении нового слова');

export const wordsActions = {
    addWordStart,
    addWordSuccess,
    addWordError,
};
