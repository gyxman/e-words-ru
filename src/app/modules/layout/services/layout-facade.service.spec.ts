import {LayoutFacadeService} from './layout-facade.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AppState} from '../../../store/app.state';
import {TestBed} from '@angular/core/testing';
import {fromApp} from '../../../store/app.selectors';
import {hot} from 'jest-marbles';

describe('LayoutFacadeService - сервис по работе с компонентом авторизованной зоны', () => {
    let testedService: LayoutFacadeService;
    let storeMock: MockStore<AppState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LayoutFacadeService, provideMockStore()],
        });

        testedService = TestBed.inject(LayoutFacadeService);
        storeMock = TestBed.inject(MockStore);
    });

    describe('showLoader$ - информация о показе лоадера', () => {
        it('Если слова еще не загрузились, то отображаем лоадер', () => {
            // arrange
            storeMock.overrideSelector(fromApp.isWordsLoaded, false);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(hot('x', {x: true}));
        });

        it('Если слова уже загрузились, то не отображаем лоадер', () => {
            // arrange
            storeMock.overrideSelector(fromApp.isWordsLoaded, true);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(hot('x', {x: false}));
        });
    });
});
