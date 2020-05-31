import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {AppEffects} from './app.effects';
import {NotificationFacadeService} from '../modules/utils/modules/notification/services/notification-facade.service';
import {NotificationModel} from '../modules/utils/modules/notification/models/notification';
import {appActions} from './app.actions';
import {ApiService} from '../services/api.service';
import {AuthFacadeService} from '../modules/auth/services/auth-facade.service';
import {hot} from 'jest-marbles';
import {Word} from '../modules/words/models/word';

describe('AppEffects - эффекты по работе со приложением', () => {
    let testedEffects: AppEffects;
    let metadata: EffectsMetadata<AppEffects>;
    let actionsMock$: Observable<Action>;
    let notificationFacadeServiceMock: NotificationFacadeService;
    let apiServiceMock: ApiService;
    let authFacadeServiceMock: AuthFacadeService;

    beforeEach(() => {
        notificationFacadeServiceMock = mock(NotificationFacadeService);
        apiServiceMock = mock(ApiService);
        authFacadeServiceMock = mock(AuthFacadeService);
    });

    beforeEach(() => {
        when(authFacadeServiceMock.userId).thenReturn(of('userId'));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppEffects,
                provideMockActions(() => actionsMock$),
                {
                    provide: NotificationFacadeService,
                    useFactory: () => instance(notificationFacadeServiceMock),
                },
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

        testedEffects = TestBed.inject(AppEffects);
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
                x: {type: '[app] Инициализация эффектов'},
            });

            // assert
            const expected$ = hot('x', {
                x: appActions.getWordsSuccess({data: [{id: 'wordId'} as Word]}),
            });

            expect(testedEffects.getWordsStart$).toBeObservable(expected$);
        });
    });

    describe('showNotification$ - эффект по показу нотификаций', () => {
        it('Эффект по показу нотификаций не диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.showNotification$).toEqual({
                dispatch: false,
                useEffectsErrorHandler: true,
            });
        });

        it(`Если приходит экшен на показ нотификаций, вызываем метод показа нотификаций и передаем данные`, () => {
            // arrange
            const data = {
                text: 'Слово успешно добавлено',
                type: 'success',
            } as NotificationModel;

            actionsMock$ = of(appActions.showNotification({data}));

            // act
            testedEffects.showNotification$.subscribe();

            // assert
            verify(
                notificationFacadeServiceMock.showNotification(deepEqual(data)),
            ).once();
        });
    });
});
