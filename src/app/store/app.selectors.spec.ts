import {fromApp} from './app.selectors';

describe('Получение информации из стейта приложения', () => {
    it('Получение списка слов', () => {
        // assert
        const state = {words: []};

        expect(fromApp.words.projector(state)).toEqual([]);
    });

    it('Получение информации загружены ли слова', () => {
        // assert
        const state = {isWordsLoaded: true};

        expect(fromApp.isWordsLoaded.projector(state)).toBe(true);
    });
});
