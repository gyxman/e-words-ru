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
import {appActions} from '../../../store/app.actions';
import {AppState} from '../../../store/app.state';
import {fromApp} from '../../../store/app.selectors';
import {fromExercises} from './exercises.selectors';
import {of, timer} from 'rxjs';
import {ExerciseTypeEnum} from '../enums/exercise-type.enum';

type CheckWordResult = Readonly<{
    result: boolean;
    answer: string;
}>;

@Injectable()
export class ExercisesEffects implements OnInitEffects {
    ngrxOnInitEffects(): Action {
        return {type: '[exercises] Подобрать следующее слово'};
    }

    generateWord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(exercisesActions.generateWord),
            switchMap(() =>
                this.store$.select(fromApp.isWordsLoaded).pipe(
                    filter(isWordsLoaded => isWordsLoaded),
                    withLatestFrom(
                        this.store$.select(fromApp.words),
                        this.store$.select(fromExercises.currentWord),
                    ),
                ),
            ),
            map(([_, words, currentWord]) => {
                let word: Word;

                do {
                    word = words[this.getRandomInt(0, words.length)];
                } while (word.id === (currentWord && currentWord.id));

                return exercisesActions.generateWordSuccess({word});
            }),
            takeUntil(timer(5000)),
            defaultIfEmpty(
                appActions.showNotification({
                    data: {
                        text: 'Не удалось загрузить слова, попробуйте позже',
                        type: 'error',
                        time: 2000,
                    },
                }) as Action,
            ),
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
        private readonly store$: Store<ExercisesState & AppState>,
    ) {}

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
