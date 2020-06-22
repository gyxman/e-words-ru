import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {WordsFacadeService} from './words-facade.service';
import {WordsState} from '../store/words.state';
import {Word} from '../models/word';
import {wordsActions} from '../store/words.actions';
import {cold} from 'jest-marbles';
import {fromWords} from '../store/words.selectors';

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

    describe('showLoader$ - отображение лоадера при отправке формы', () => {
        it('Если пришла информация об отображении лоадера, храним ее в showLoader$', () => {
            // arrange
            storeMock.overrideSelector(fromWords.isLoading, true);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(
                cold('x', {
                    x: true,
                }),
            );
        });
    });

    describe('words$ - информация о словах на изучение', () => {
        it('Если пришла информация об отображении слов, храним ее в words$', () => {
            // arrange
            storeMock.overrideSelector(fromWords.words, [{id: 'wordId'} as Word]);

            // act & assert
            expect(testedService.words$).toBeObservable(
                cold('x', {
                    x: [{id: 'wordId'}],
                }),
            );
        });
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
