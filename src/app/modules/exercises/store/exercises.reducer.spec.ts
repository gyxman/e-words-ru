import {ExercisesState} from './exercises.state';
import {exercisesReducer} from './exercises.reducer';
import {exercisesActions} from './exercises.actions';
import {ExerciseTypeEnum} from '../enums/exercise-type.enum';
import {Word} from '../../words/models/word';

describe('exercisesReducer - редьюсер упражнений', () => {
    it('Если приходит информация о генерации слова, устанавливаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: false,
            currentWord: null,
        } as ExercisesState;

        // act & assert
        expect(exercisesReducer(undefined, exercisesActions.generateWord())).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('Если приходит информация о проверке слова, устанавливаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: false,
            currentWord: null,
        } as ExercisesState;

        // act & assert
        const data = {type: ExerciseTypeEnum.InputRussian, answer: 'answer'};

        expect(exercisesReducer(undefined, exercisesActions.checkAnswer({data}))).toEqual(
            {
                ...initialState,
                isLoading: true,
            },
        );
    });

    it('Если приходит информация об успешной генерации нового слова, устанавливаем это слово в качестве текущего', () => {
        // arrange
        const initialState = {
            isLoading: false,
            currentWord: null,
        } as ExercisesState;

        // act & assert
        const word = {id: 'wordId'} as Word;

        expect(
            exercisesReducer(undefined, exercisesActions.generateWordSuccess({word})),
        ).toEqual({
            ...initialState,
            currentWord: word,
        });
    });

    it('Если приходит информация об успешной генерации нового слова, снимаем флаг о загрузке', () => {
        // arrange
        const word = {id: 'wordId'} as Word;

        const initialState = {
            isLoading: true,
            currentWord: word,
        } as ExercisesState;

        // act & assert
        expect(
            exercisesReducer(undefined, exercisesActions.generateWordSuccess({word})),
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('Если приходит информация о проверке правильного ответа, снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
            currentWord: null,
        } as ExercisesState;

        // act & assert
        expect(
            exercisesReducer(undefined, exercisesActions.checkAnswerSuccess()),
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('Если приходит информация о проверке неправильного ответа, снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
            currentWord: null,
        } as ExercisesState;

        // act & assert
        expect(exercisesReducer(undefined, exercisesActions.checkAnswerError())).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});
