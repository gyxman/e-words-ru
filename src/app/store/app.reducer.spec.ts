import {AppState} from './app.state';
import {appReducer} from './app.reducer';
import {appActions} from './app.actions';
import {Word} from '../modules/words/models/word';

describe('appReducer - редьюсер приложения', () => {
    it('Если приходит информация об успешной загрузке слов, то устанавливаем полученные слова', () => {
        // arrange
        const initialState = {
            wordsLoaded: true,
            words: [],
        } as AppState;

        const data = [{id: 'wordId'} as Word];

        // act & assert
        expect(appReducer(undefined, appActions.getWordsSuccess({data}))).toEqual({
            ...initialState,
            words: data,
        });
    });

    it('Если приходит информация об успешной загрузке слов, то устанавливаем флаг о том, что слова загружены', () => {
        // arrange
        const initialState = {
            wordsLoaded: false,
            words: [],
        } as AppState;

        const data = [];

        // act & assert
        expect(appReducer(undefined, appActions.getWordsSuccess({data}))).toEqual({
            ...initialState,
            wordsLoaded: true,
        });
    });
});
