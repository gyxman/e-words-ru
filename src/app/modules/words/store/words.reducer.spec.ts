import {WordsState} from './words.state';
import {Word} from '../models/word';
import {wordsActions} from './words.actions';
import {wordsReducer} from './words.reducer';

describe('wordsReducer - редьюсер слов на изучении', () => {
    it('Если приходит информация о начале добавления нового слова, то ставим флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: false,
        } as WordsState;

        const data = {
            id: 'wordId',
        } as Word;

        // act & assert
        expect(wordsReducer(undefined, wordsActions.addWordStart({data}))).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('Если приходит информация об успехе добавления нового слова на изучение, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as WordsState;

        // act & assert
        expect(wordsReducer(undefined, wordsActions.addWordSuccess())).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('Если приходит информация об ошибке при добавлении нового слова на изучение, то снимаем флаг о загрузке', () => {
        // arrange
        const initialState = {
            isLoading: true,
        } as WordsState;

        // act & assert
        expect(wordsReducer(undefined, wordsActions.addWordError())).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});
