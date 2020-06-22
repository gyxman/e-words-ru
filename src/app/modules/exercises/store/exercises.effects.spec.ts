import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ExercisesState} from './exercises.state';
import {ExercisesEffects} from './exercises.effects';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot} from 'jest-marbles';
import {exercisesActions} from './exercises.actions';
import {fromExercises} from './exercises.selectors';
import {TestScheduler} from 'rxjs/testing';
import {appActions} from '../../../store/app.actions';
import {Word} from '../../words/models/word';
import {ExerciseTypeEnum} from '../enums/exercise-type.enum';
import {WordsState} from '../../words/store/words.state';
import {fromWords} from '../../words/store/words.selectors';

describe('ExercisesEffects - эффекты по работе с упражнениями', () => {
    let testedEffects: ExercisesEffects;
    let metadata: EffectsMetadata<ExercisesEffects>;
    let actionsMock$: Observable<Action>;
    let storeMock: MockStore<ExercisesState & WordsState>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ExercisesEffects,
                provideMockStore(),
                provideMockActions(() => actionsMock$),
            ],
        });

        testedEffects = TestBed.inject(ExercisesEffects);
        metadata = getEffectsMetadata(testedEffects);
        storeMock = TestBed.inject(MockStore);
    });

    describe('generateWord$ - эффект подбора слова для изучения', () => {
        it('Эффект подбора слова для изучения диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.generateWord$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it('Если необходимо подобрать слово для изучения, но слова еще не загружены, то ничего не делаем', () => {
            // arrange
            storeMock.overrideSelector(fromWords.isWordsLoaded, false);
            storeMock.overrideSelector(fromWords.words, []);
            storeMock.overrideSelector(fromExercises.currentWord, null);

            // act
            actionsMock$ = hot('x', {
                x: exercisesActions.generateWord(),
            });

            // assert
            expect(testedEffects.generateWord$).toBeObservable(hot(''));
        });

        it(`Если необходимо подобрать слово для изучения, но слова не успевают загрузиться за 5 секунд,
            показываем нотификацию, что не удалось загрузить слова`, () => {
            testScheduler.run(({expectObservable, hot}) => {
                // arrange
                storeMock.overrideSelector(fromWords.isWordsLoaded, false);
                storeMock.overrideSelector(fromWords.words, []);
                storeMock.overrideSelector(fromExercises.currentWord, null);

                // act
                actionsMock$ = hot('x', {
                    x: exercisesActions.generateWord(),
                });

                // assert
                const expected$ = appActions.showNotification({
                    data: {
                        text: 'Не удалось загрузить слова, попробуйте позже',
                        type: 'error',
                        time: 2000,
                    },
                });

                expectObservable(testedEffects.generateWord$).toBe('5s x', {
                    x: expected$,
                });
            });
        });

        it(`Если необходимо подобрать слово для изучения, то получаем все необходимые данные,
            подбираем слово (отличное от текущего) и диспатчим экшен о подборе`, () => {
            // arrange
            storeMock.overrideSelector(fromWords.isWordsLoaded, true);
            storeMock.overrideSelector(fromWords.words, [
                {id: 'wordId1'} as Word,
                {id: 'wordId2'} as Word,
            ]);
            storeMock.overrideSelector(fromExercises.currentWord, {
                id: 'wordId1',
            } as Word);

            // act
            actionsMock$ = hot('x', {
                x: exercisesActions.generateWord(),
            });

            // assert
            const expected$ = hot('x', {
                x: exercisesActions.generateWordSuccess({word: {id: 'wordId2'} as Word}),
            });

            expect(testedEffects.generateWord$).toBeObservable(expected$);
        });
    });

    describe('checkAnswer$ - эффект проверки ответа пользователя', () => {
        it('Эффект проверки ответа пользователя диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.checkAnswer$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it(`Если необходимо проверить ответ пользователя и он оказывается верным,
            показываем нотификацию и генерируем новое слово`, () => {
            // arrange
            storeMock.overrideSelector(fromExercises.currentWord, {
                id: 'wordId',
                russianWord: 'ответ',
            } as Word);

            // act
            actionsMock$ = hot('x', {
                x: exercisesActions.checkAnswer({
                    data: {answer: 'ответ', type: ExerciseTypeEnum.InputRussian},
                }),
            });

            // assert
            const expected$ = hot('(xyz)', {
                x: appActions.showNotification({
                    data: {text: 'Правильно', type: 'success', time: 600},
                }),
                y: exercisesActions.checkAnswerSuccess(),
                z: exercisesActions.generateWord(),
            });

            expect(testedEffects.checkAnswer$).toBeObservable(expected$);
        });

        it(`Если необходимо проверить ответ пользователя и он оказывается неверным,
            показываем нотификацию и генерируем новое слово`, () => {
            // arrange
            storeMock.overrideSelector(fromExercises.currentWord, {
                id: 'wordId',
                russianWord: 'ответ',
                synonyms: [],
            } as Word);

            // act
            actionsMock$ = hot('x', {
                x: exercisesActions.checkAnswer({
                    data: {answer: 'ответ неверный', type: ExerciseTypeEnum.InputRussian},
                }),
            });

            // assert
            const expected$ = hot('(xyz)', {
                x: appActions.showNotification({
                    data: {
                        text: `Ошибка, правильный ответ: <br> ответ`,
                        type: 'error',
                        time: 2000,
                    },
                }),
                y: exercisesActions.checkAnswerError(),
                z: exercisesActions.generateWord(),
            });

            expect(testedEffects.checkAnswer$).toBeObservable(expected$);
        });
    });
});
