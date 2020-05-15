import {MapperPipe} from './mapper.pipe';
import {Mapper} from './mapper';

describe('MapperPipe - пайп для изменения данных', () => {
    let testedPipe: MapperPipe<string, string>;

    beforeEach(() => {
        testedPipe = new MapperPipe();
    });

    it('Если пользователь применяет пайп для изменения, то пайп корректно меняет данные', () => {
        // arrange
        const data = 'Hello world';
        const mapper: Mapper<string, string> = (text, ...params) => text.toUpperCase();

        // act & assert
        expect(testedPipe.transform(data, mapper)).toBe(data.toUpperCase());
    });

    it('Если пользователь применяет пайп для изменения и передает дополнительные параметры, то пайп корректно меняет данные', () => {
        // arrange
        const data = 'Hello world';
        const params = ['hello', 'world'];
        const mapper: Mapper<string, string> = (text, ...args) =>
            `${text.toUpperCase()} ${args.join(', ')}`;

        // act & assert
        expect(testedPipe.transform(data, mapper, ...params)).toBe(
            'HELLO WORLD hello, world',
        );
    });
});
