import {Observable, of, throwError} from 'rxjs';
import {Action} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {Router} from '@angular/router';
import {WordsEffects} from './words.effects';
import {WordsState} from './words.state';
import {WordsFacadeService} from '../services/words-facade.service';
import {wordsActions} from './words.actions';
import {ManageWordFormService} from '../services/manage-word-form.service';
import {AuthFacadeService} from '../../auth/services/auth-facade.service';
import {hot} from 'jest-marbles';
import {Word} from '../models/word';
import {appActions} from '../../../store/app.actions';

describe('WordsEffects - эффекты по работе со словами на изучении', () => {
    let testedEffects: WordsEffects;
    let metadata: EffectsMetadata<WordsEffects>;
    let actionsMock$: Observable<Action>;
    let storeMock: MockStore<WordsState>;
    let apiServiceMock: ApiService;
    let wordsFacadeServiceMock: WordsFacadeService;
    let routerMock: Router;
    let authFacadeServiceMock: AuthFacadeService;
    let manageWordFormServiceMock: ManageWordFormService;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
        wordsFacadeServiceMock = mock(WordsFacadeService);
        routerMock = mock(Router);
        authFacadeServiceMock = mock(AuthFacadeService);
        manageWordFormServiceMock = mock(ManageWordFormService);
    });

    beforeEach(() => {
        when(authFacadeServiceMock.userId).thenReturn(of('userId'));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WordsEffects,
                provideMockStore(),
                provideMockActions(() => actionsMock$),
                {
                    provide: ApiService,
                    useFactory: () => instance(apiServiceMock),
                },
                {
                    provide: AuthFacadeService,
                    useFactory: () => instance(authFacadeServiceMock),
                },
                {
                    provide: WordsFacadeService,
                    useFactory: () => instance(wordsFacadeServiceMock),
                },
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
                {
                    provide: ManageWordFormService,
                    useFactory: () => instance(manageWordFormServiceMock),
                },
            ],
        });

        testedEffects = TestBed.inject(WordsEffects);
        metadata = getEffectsMetadata(testedEffects);
        storeMock = TestBed.inject(MockStore);
    });

    describe('getWordsStart$ - эффект по загрузке слов из базы данных', () => {
        it('Эффект по загрузке слов из базы данных диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.getWordsStart$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it('Если эффекты проинициализировись, начинается загрузка слов из базы данных', () => {
            // arrange
            when(apiServiceMock.getWords('userId')).thenReturn(
                of([{id: 'wordId'} as Word]),
            );

            // act
            actionsMock$ = hot('x', {
                x: wordsActions.getWordsStart(),
            });

            // assert
            const expected$ = hot('x', {
                x: wordsActions.getWordsSuccess({data: [{id: 'wordId'} as Word]}),
            });

            expect(testedEffects.getWordsStart$).toBeObservable(expected$);
        });
    });

    describe('addWordStart$ - эффект начала добавления слова на изучение', () => {
        it('Эффект начала добавления слова на изучение диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.addWordStart$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it(`Если вызывается метод добавления слова и слово успешно добавляется в базу данных,
            диспатчим экшен об успехе и показе нотификации`, () => {
            // arrange
            when(
                apiServiceMock.addWord(
                    deepEqual({
                        word: deepEqual({id: 'wordId'}) as Word,
                        userId: 'userId',
                    }),
                ),
            ).thenReturn(of(true) as any);

            // act
            actionsMock$ = hot('x', {
                x: wordsActions.addWordStart({data: {id: 'wordId'} as Word}),
            });

            // assert
            const expected$ = hot('(xy)', {
                x: wordsActions.addWordSuccess(),
                y: appActions.showNotification({
                    data: {
                        text: 'Слово успешно добавлено',
                        type: 'success',
                    },
                }),
            });

            expect(testedEffects.addWordStart$).toBeObservable(expected$);
        });

        it(`Если вызывается метод добавления слова, но слово не добавляется в базу данных,
            диспатчим экшен об ошибке и показе нотификации`, () => {
            // arrange
            when(
                apiServiceMock.addWord(
                    deepEqual({
                        word: deepEqual({id: 'wordId'}) as Word,
                        userId: 'userId',
                    }),
                ),
            ).thenReturn(throwError('error'));

            // act
            actionsMock$ = hot('x', {
                x: wordsActions.addWordStart({data: {id: 'wordId'} as Word}),
            });

            // assert
            const expected$ = hot('(xy)', {
                x: wordsActions.addWordError(),
                y: appActions.showNotification({
                    data: {
                        text: 'Ошибка при добавлении слова',
                        type: 'error',
                    },
                }),
            });

            expect(testedEffects.addWordStart$).toBeObservable(expected$);
        });
    });

    describe('addWordSuccess$ - эффект успешного добавления слова на изучение', () => {
        it('Эффект успешного добавления слова на изучение не диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.addWordSuccess$).toEqual({
                dispatch: false,
                useEffectsErrorHandler: true,
            });
        });

        it('Если вызывается метод успешного добавления слова, очищаем форму добавления слова', () => {
            // arrange
            actionsMock$ = of(wordsActions.addWordSuccess());

            // act
            testedEffects.addWordSuccess$.subscribe();

            // assert
            verify(manageWordFormServiceMock.clearForm()).once();
        });
    });
});
