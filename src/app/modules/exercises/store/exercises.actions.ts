import {createAction, props} from '@ngrx/store';
import {Word} from '../../words/models/word';
import {ExerciseAnswer} from '../models/exercise-answer';

const generateWord = createAction('[exercises] Подобрать следующее слово');

const generateWordSuccess = createAction(
    '[exercises] Слово подобрано успешно',
    props<{word: Word}>(),
);

const checkAnswer = createAction(
    '[exercises] Проверить ответ пользователя',
    props<{data: ExerciseAnswer}>(),
);

const checkAnswerSuccess = createAction('[exercises] Ответ пользователя верен');

const checkAnswerError = createAction('[exercises] Ответ пользователя неверен');

export const exercisesActions = {
    generateWord,
    generateWordSuccess,
    checkAnswer,
    checkAnswerSuccess,
    checkAnswerError,
};
