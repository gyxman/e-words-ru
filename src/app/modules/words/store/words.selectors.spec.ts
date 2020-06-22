import {fromWords} from './words.selectors';

describe('Получение информации из стейта слов', () => {
    it('Получение списка слов', () => {
        // assert
        const state = {words: []};

        expect(fromWords.words.projector(state)).toEqual([]);
    });

    it('Получение информации загружены ли слова', () => {
        // assert
        const state = {wordsLoaded: true};

        expect(fromWords.isWordsLoaded.projector(state)).toBe(true);
    });

    it('Получение информации о статусе загрузки', () => {
        // assert
        const state = {isLoading: true};

        expect(fromWords.isLoading.projector(state)).toBe(true);
    });
});
