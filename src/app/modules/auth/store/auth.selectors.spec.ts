import {fromAuth} from './auth.selectors';

describe('Получение информации из стейта авторизационной группы', () => {
    it('Получение информации о статусе загрузки', () => {
        // assert
        const state = {isLoading: true};

        expect(fromAuth.isLoading.projector(state)).toBe(true);
    });
});
