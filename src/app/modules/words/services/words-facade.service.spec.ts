import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {WordsFacadeService} from './words-facade.service';
import {WordsState} from '../store/words.state';
import {Word} from '../models/word';
import {wordsActions} from '../store/words.actions';

describe('WordsFacadeService - сервис по работе со словами для изучения', () => {
    let testedService: WordsFacadeService;
    let storeMock: MockStore<WordsState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WordsFacadeService, provideMockStore()],
        });

        testedService = TestBed.inject(WordsFacadeService);
        storeMock = TestBed.inject(MockStore);
    });

    describe('addWord - метод по добавлению нового слова на изучение', () => {
        it('Если вызывается метод addWord, то диспатчим экшен о начале добавления нового слова и передаем необходимые данные', () => {
            // arrange
            jest.spyOn(storeMock, 'dispatch');

            const data = {
                id: 'wordId',
            } as Word;

            // act
            testedService.addWord(data);

            // assert
            expect(storeMock.dispatch).toHaveBeenCalledWith(
                wordsActions.addWordStart({data}),
            );
        });
    });
});
