import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {ApiService} from '../../../services/api.service';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {NotificationFacadeService} from '../../utils/modules/notification/services/notification-facade.service';
import {NotificationModel} from '../../utils/modules/notification/models/notification';
import {Router} from '@angular/router';
import {WordsEffects} from './words.effects';
import {WordsState} from './words.state';
import {WordsFacadeService} from '../services/words-facade.service';
import {wordsActions} from './words.actions';

describe('WordsEffects - эффекты по работе со словами на изучении', () => {
    let testedEffects: WordsEffects;
    let metadata: EffectsMetadata<WordsEffects>;
    let actionsMock$: Observable<Action>;
    let storeMock: MockStore<WordsState>;
    let apiServiceMock: ApiService;
    let wordsFacadeServiceMock: WordsFacadeService;
    let notificationFacadeServiceMock: NotificationFacadeService;
    let routerMock: Router;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
        wordsFacadeServiceMock = mock(WordsFacadeService);
        notificationFacadeServiceMock = mock(NotificationFacadeService);
        routerMock = mock(Router);
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
                    provide: WordsFacadeService,
                    useFactory: () => instance(wordsFacadeServiceMock),
                },
                {
                    provide: NotificationFacadeService,
                    useFactory: () => instance(notificationFacadeServiceMock),
                },
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
            ],
        });

        testedEffects = TestBed.inject(WordsEffects);
        metadata = getEffectsMetadata(testedEffects);
        storeMock = TestBed.inject(MockStore);
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

            actionsMock$ = of(wordsActions.showNotification({data}));

            // act
            testedEffects.showNotification$.subscribe();

            // assert
            verify(
                notificationFacadeServiceMock.showNotification(deepEqual(data)),
            ).once();
        });
    });
});
