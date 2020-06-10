import {fromExercises} from './exercises.selectors';
import {Word} from '../../words/models/word';

describe('Получение информации из стейта упражнений', () => {
    it('Получение информации идет ли сейчас загрузка', () => {
        // assert
        const state = {isLoading: true};

        expect(fromExercises.isLoading.projector(state)).toBe(true);
    });

    it('Получение информации о текущем слове', () => {
        // assert
        const word = {id: 'wordId'} as Word;

        const state = {currentWord: word};

        expect(fromExercises.currentWord.projector(state)).toEqual(word);
    });
});
