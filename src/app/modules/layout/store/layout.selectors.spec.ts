import {fromLayout} from './layout.selectors';

describe('Получение информации из стейта авторизованной зоны приложения', () => {
    it('Получение списка слов', () => {
        // assert
        const state = {words: []};

        expect(fromLayout.words.projector(state)).toEqual([]);
    });

    it('Получение информации загружены ли слова', () => {
        // assert
        const state = {wordsLoaded: true};

        expect(fromLayout.isWordsLoaded.projector(state)).toBe(true);
    });
});
