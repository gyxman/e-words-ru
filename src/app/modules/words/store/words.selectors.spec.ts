import {fromWords} from './words.selectors';

describe('Получение информации из стейта слов', () => {
    it('Получение информации о статусе загрузки', () => {
        // assert
        const state = {isLoading: true};

        expect(fromWords.isLoading.projector(state)).toBe(true);
    });
});
