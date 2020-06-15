import {InputRussianService} from './input-russian.service';
import {TestBed} from '@angular/core/testing';
import {ComponentEnum} from '../enums/component.enum';

describe('InputRussianService - сервис, возвращающий информацию по упражнению ввода перевода на русском', () => {
    let testedService: InputRussianService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InputRussianService],
        });

        testedService = TestBed.inject(InputRussianService);
    });

    describe('getItem - метод получения информации по упражнению', () => {
        it('Если вызывается метод получения информации по упражнению, то передаем ее', () => {
            // assert
            expect(testedService.getItem()).toEqual({
                name: 'С английского на русский',
                component: ComponentEnum.InputRussian,
            });
        });
    });
});
