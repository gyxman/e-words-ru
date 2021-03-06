import {WordsState} from './words.state';
import {Word} from '../models/word';
import {wordsActions} from './words.actions';
import {wordsReducer} from './words.reducer';

describe('wordsReducer - редьюсер слов на изучении', () => {
    describe('getWordsSuccess - успешная загрузка слов', () => {
        it('Если приходит информация об успешной загрузке слов, то устанавливаем полученные слова', () => {
            // arrange
            const initialState = {
                wordsLoaded: true,
                words: [],
                isLoading: false,
            } as WordsState;

            const data = [{id: 'wordId'} as Word];

            // act & assert
            expect(
                wordsReducer(initialState, wordsActions.getWordsSuccess({data})),
            ).toEqual({
                ...initialState,
                words: data,
            });
        });

        it('Если приходит информация об успешной загрузке слов, то устанавливаем флаг о том, что слова загружены', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: false,
            } as WordsState;

            const data = [];

            // act & assert
            expect(
                wordsReducer(initialState, wordsActions.getWordsSuccess({data})),
            ).toEqual({
                ...initialState,
                wordsLoaded: true,
            });
        });
    });

    describe('getWordsError - ошибка при загрузке слов', () => {
        it('Если приходит информация об ошибке при загрузке слов, то устанавливаем флаг о том, что слова не загрузились', () => {
            // arrange
            const initialState = {
                wordsLoaded: true,
                words: [],
                isLoading: false,
            } as WordsState;

            // act & assert
            expect(wordsReducer(initialState, wordsActions.getWordsError())).toEqual({
                ...initialState,
                wordsLoaded: false,
            });
        });
    });

    describe('addWordStart - начало добавления нового слова', () => {
        it('Если приходит информация о начале добавления нового слова, то ставим флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: false,
            } as WordsState;

            const data = {
                id: 'wordId',
            } as Word;

            // act & assert
            expect(wordsReducer(initialState, wordsActions.addWordStart({data}))).toEqual(
                {
                    ...initialState,
                    isLoading: true,
                },
            );
        });
    });

    describe('addWordSuccess - новое слово успешно добавлено', () => {
        it('Если приходит информация об успехе добавления нового слова на изучение, то снимаем флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: true,
            } as WordsState;

            // act & assert
            expect(
                wordsReducer(
                    initialState,
                    wordsActions.addWordSuccess({data: {} as Word}),
                ),
            ).toEqual({
                ...initialState,
                words: [{}],
                isLoading: false,
            });
        });

        it('Если приходит информация об успехе добавления нового слова на изучение, то обновляем список слов', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [{id: '1'} as Word],
                isLoading: false,
            } as WordsState;

            // act & assert
            expect(
                wordsReducer(
                    initialState,
                    wordsActions.addWordSuccess({data: {id: '2'} as Word}),
                ),
            ).toEqual({
                ...initialState,
                words: [{id: '1'} as Word, {id: '2'} as Word],
            });
        });
    });

    describe('addWordError - ошибка при добавлении нового слова', () => {
        it('Если приходит информация об ошибке при добавлении нового слова на изучение, то снимаем флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: true,
            } as WordsState;

            // act & assert
            expect(wordsReducer(initialState, wordsActions.addWordError())).toEqual({
                ...initialState,
                isLoading: false,
            });
        });
    });

    describe('removeWordStart - начало удаления слова', () => {
        it('Если приходит информация о начале удаления слова, то ставим флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: false,
            } as WordsState;

            // act & assert
            expect(
                wordsReducer(
                    initialState,
                    wordsActions.removeWordStart({wordId: 'wordId'}),
                ),
            ).toEqual({
                ...initialState,
                isLoading: true,
            });
        });
    });

    describe('removeWordSuccess - слово успешно удалено', () => {
        it('Если приходит информация об успехе удаления слова, то снимаем флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: true,
            } as WordsState;

            // act & assert
            expect(
                wordsReducer(
                    initialState,
                    wordsActions.removeWordSuccess({wordId: 'wordId'}),
                ),
            ).toEqual({
                ...initialState,
                isLoading: false,
            });
        });

        it('Если приходит информация об успехе удаления слова, то обновляем список слов', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [{id: '1'} as Word, {id: '2'} as Word],
                isLoading: false,
            } as WordsState;

            // act & assert
            expect(
                wordsReducer(initialState, wordsActions.removeWordSuccess({wordId: '1'})),
            ).toEqual({
                ...initialState,
                words: [{id: '2'} as Word],
            });
        });
    });

    describe('removeWordError - ошибка при удалении слова', () => {
        it('Если приходит информация об ошибке при удалениии слова, то снимаем флаг о загрузке', () => {
            // arrange
            const initialState = {
                wordsLoaded: false,
                words: [],
                isLoading: true,
            } as WordsState;

            // act & assert
            expect(wordsReducer(initialState, wordsActions.removeWordError())).toEqual({
                ...initialState,
                isLoading: false,
            });
        });
    });
});
