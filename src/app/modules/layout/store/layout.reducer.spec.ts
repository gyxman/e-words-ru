import {LayoutState} from './layout.state';
import {Word} from '../../words/models/word';
import {layoutReducer} from './layout.reducer';
import {layoutActions} from './layout.actions';

describe('layoutReducer - редьюсер авторизованной зоны приложения', () => {
    it('Если приходит информация об успешной загрузке слов, то устанавливаем полученные слова', () => {
        // arrange
        const initialState = {
            wordsLoaded: true,
            words: [],
        } as LayoutState;

        const data = [{id: 'wordId'} as Word];

        // act & assert
        expect(layoutReducer(undefined, layoutActions.getWordsSuccess({data}))).toEqual({
            ...initialState,
            words: data,
        });
    });

    it('Если приходит информация об успешной загрузке слов, то устанавливаем флаг о том, что слова загружены', () => {
        // arrange
        const initialState = {
            wordsLoaded: false,
            words: [],
        } as LayoutState;

        const data = [];

        // act & assert
        expect(layoutReducer(undefined, layoutActions.getWordsSuccess({data}))).toEqual({
            ...initialState,
            wordsLoaded: true,
        });
    });
});
