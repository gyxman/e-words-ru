import {LayoutEffects} from './layout.effects';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {ApiService} from 'src/app/services/api.service';
import {AuthFacadeService} from '../../auth/services/auth-facade.service';
import {instance, mock, when} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Word} from '../../words/models/word';
import {hot} from 'jest-marbles';
import {layoutActions} from './layout.actions';

describe('LayoutEffects - эффекты по работе с авторизованной зоной приложения', () => {
    let testedEffects: LayoutEffects;
    let metadata: EffectsMetadata<LayoutEffects>;
    let actionsMock$: Observable<Action>;
    let apiServiceMock: ApiService;
    let authFacadeServiceMock: AuthFacadeService;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
        authFacadeServiceMock = mock(AuthFacadeService);
    });

    beforeEach(() => {
        when(authFacadeServiceMock.userId).thenReturn(of('userId'));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LayoutEffects,
                provideMockActions(() => actionsMock$),
                {
                    provide: ApiService,
                    useFactory: () => instance(apiServiceMock),
                },
                {
                    provide: AuthFacadeService,
                    useFactory: () => instance(authFacadeServiceMock),
                },
            ],
        });

        testedEffects = TestBed.inject(LayoutEffects);
        metadata = getEffectsMetadata(testedEffects);
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
                x: {type: '[layout] Инициализация эффектов'},
            });

            // assert
            const expected$ = hot('x', {
                x: layoutActions.getWordsSuccess({data: [{id: 'wordId'} as Word]}),
            });

            expect(testedEffects.getWordsStart$).toBeObservable(expected$);
        });
    });
});
