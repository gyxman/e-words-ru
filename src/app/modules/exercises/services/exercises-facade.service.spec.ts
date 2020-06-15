import {ExercisesFacadeService} from './exercises-facade.service';
import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ExercisesState} from '../store/exercises.state';
import {cold} from 'jest-marbles';
import {fromExercises} from '../store/exercises.selectors';
import {Word} from '../../words/models/word';
import {ExerciseAnswer} from '../models/exercise-answer';
import {ExerciseTypeEnum} from '../enums/exercise-type.enum';
import {exercisesActions} from '../store/exercises.actions';

describe('ExercisesFacadeService - сервис по работе с упражнениями', () => {
    let testedService: ExercisesFacadeService;
    let storeMock: MockStore<ExercisesState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExercisesFacadeService, provideMockStore()],
        });

        testedService = TestBed.inject(ExercisesFacadeService);
        storeMock = TestBed.inject(MockStore);
    });

    describe('word$ - информация о текущем', () => {
        it('Если в сторе есть информация о текущем слове, то она возвращается', () => {
            // arrange
            const word = {id: 'wordId'} as Word;

            storeMock.overrideSelector(fromExercises.currentWord, word);

            // act & assert
            expect(testedService.word$).toBeObservable(
                cold('x', {
                    x: word,
                }),
            );
        });
    });

    describe('showLoader$ - информация о показе лоадера', () => {
        it('Если в сторе информация о показе лоадера отрицательная, то она возвращается', () => {
            // arrange
            storeMock.overrideSelector(fromExercises.isLoading, false);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(
                cold('x', {
                    x: false,
                }),
            );
        });

        it('Если в сторе информация о показе лоадера положительная, то она возвращается', () => {
            // arrange
            storeMock.overrideSelector(fromExercises.isLoading, true);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(
                cold('x', {
                    x: true,
                }),
            );
        });
    });

    describe('checkAnswer - проверка ответа пользователя', () => {
        it('Если пользователь ввел ответ и хочет его проверить, то диспатчим экшен о начале проверки', () => {
            // arrange
            jest.spyOn(storeMock, 'dispatch');

            const data: ExerciseAnswer = {
                type: ExerciseTypeEnum.InputRussian,
                answer: 'ответ',
            };

            // act
            testedService.checkAnswer(data);

            // assert
            expect(storeMock.dispatch).toHaveBeenCalledWith(
                exercisesActions.checkAnswer({data}),
            );
        });
    });
});
