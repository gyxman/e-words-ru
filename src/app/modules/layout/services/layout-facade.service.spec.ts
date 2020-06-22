import {LayoutFacadeService} from './layout-facade.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestBed} from '@angular/core/testing';
import {hot} from 'jest-marbles';
import {WordsState} from '../../words/store/words.state';
import {fromWords} from '../../words/store/words.selectors';

describe('LayoutFacadeService - сервис по работе с компонентом авторизованной зоны', () => {
    let testedService: LayoutFacadeService;
    let storeMock: MockStore<WordsState>;

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
            storeMock.overrideSelector(fromWords.isWordsLoaded, false);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(hot('x', {x: true}));
        });

        it('Если слова уже загрузились, то не отображаем лоадер', () => {
            // arrange
            storeMock.overrideSelector(fromWords.isWordsLoaded, true);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(hot('x', {x: false}));
        });
    });
});
