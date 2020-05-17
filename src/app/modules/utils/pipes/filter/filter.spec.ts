import {FilterPipe} from './filter.pipe';

describe('FilterPipe - пайп для фильтрации массива', () => {
    let testedPipe: FilterPipe;

    beforeEach(() => {
        testedPipe = new FilterPipe();
    });

    it('Если пользователь применяет пайп для фильтрации данных, то пайп корректно фильтрует данные', () => {
        // arrange
        const inputData = ['Один', 'Два', 'Одиннадцать'];

        // act & assert
        const outputData = ['Один', 'Одиннадцать'];

        expect(testedPipe.transform(inputData, 'один')).toEqual(outputData);
    });
});
