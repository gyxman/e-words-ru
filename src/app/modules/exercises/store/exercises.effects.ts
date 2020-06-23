import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {ExercisesState} from './exercises.state';
import {exercisesActions} from './exercises.actions';
import {
    defaultIfEmpty,
    filter,
    map,
    switchMap,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import {Word} from '../../words/models/word';
import {fromExercises} from './exercises.selectors';
import {of, timer} from 'rxjs';
import {ExerciseTypeEnum} from '../enums/exercise-type.enum';
import {appActions} from '../../../store/app.actions';
import {WordsState} from '../../words/store/words.state';
import {fromWords} from '../../words/store/words.selectors';

type CheckWordResult = Readonly<{
    result: boolean;
    answer: string;
}>;

const EXERCISES_EFFECTS_INIT = '[exercises] Инициализация эффектов';

@Injectable()
export class ExercisesEffects implements OnInitEffects {
    generateWord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(exercisesActions.generateWord),
            switchMap(() =>
                this.store$.select(fromWords.isWordsLoaded).pipe(
                    filter(isWordsLoaded => isWordsLoaded),
                    withLatestFrom(
                        this.store$.select(fromWords.words),
                        this.store$.select(fromExercises.currentWord),
                    ),
                    takeUntil(timer(5000)),
                    defaultIfEmpty([false, [], {}]),
                ),
            ),
            map(([_, words, currentWord]: [boolean, Word[], Word]) => {
                if (!words.length) {
                    return appActions.showNotification({
                        data: {
                            text: 'Не удалось загрузить слова, попробуйте позже',
                            type: 'error',
                            time: 2000,
                        },
                    });
                }

                let word: Word;

                do {
                    word = words[this.getRandomInt(0, words.length)];
                } while (word.id === (currentWord && currentWord.id));

                return exercisesActions.generateWordSuccess({word});
            }),
        ),
    );

    checkAnswer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(exercisesActions.checkAnswer),
            withLatestFrom(this.store$.select(fromExercises.currentWord)),
            switchMap(([{data}, word]) => {
                const {result, answer} = this.checkAnswer({word, ...data});

                if (result) {
                    return of(
                        appActions.showNotification({
                            data: {text: 'Правильно', type: 'success', time: 600},
                        }),
                        exercisesActions.checkAnswerSuccess(),
                        exercisesActions.generateWord(),
                    );
                } else {
                    return of(
                        appActions.showNotification({
                            data: {
                                text: `Ошибка, правильный ответ: <br> ${answer}`,
                                type: 'error',
                                time: 2000,
                            },
                        }),
                        exercisesActions.checkAnswerError(),
                        exercisesActions.generateWord(),
                    );
                }
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<ExercisesState & WordsState>,
    ) {}

    ngrxOnInitEffects(): Action {
        return {type: EXERCISES_EFFECTS_INIT};
    }

    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private checkAnswer({
        word,
        type,
        answer,
    }: {
        word: Word;
        type: ExerciseTypeEnum;
        answer: string;
    }): CheckWordResult {
        let result: CheckWordResult = {result: false, answer: ''};

        switch (type) {
            case ExerciseTypeEnum.InputRussian:
                result = this.checkRussianAnswer({word, answer});
        }

        return result;
    }

    private checkEnglishAnswer({
        word: {englishWord},
        answer,
    }: {
        word: Word;
        answer: string;
    }): CheckWordResult {
        return {result: englishWord === answer, answer: englishWord};
    }

    private checkRussianAnswer({
        word: {russianWord, synonyms},
        answer,
    }: {
        word: Word;
        answer: string;
    }): CheckWordResult {
        return {
            result: russianWord === answer || synonyms.includes(answer),
            answer: russianWord,
        };
    }
}
