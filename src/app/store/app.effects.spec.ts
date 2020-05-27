import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {AppEffects} from './app.effects';
import {NotificationFacadeService} from '../modules/utils/modules/notification/services/notification-facade.service';
import {NotificationModel} from '../modules/utils/modules/notification/models/notification';
import {appActions} from './app.actions';

describe('AppEffects - эффекты по работе со приложением', () => {
    let testedEffects: AppEffects;
    let metadata: EffectsMetadata<AppEffects>;
    let actionsMock$: Observable<Action>;
    let notificationFacadeServiceMock: NotificationFacadeService;

    beforeEach(() => {
        notificationFacadeServiceMock = mock(NotificationFacadeService);
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
            ],
        });

        testedEffects = TestBed.inject(AppEffects);
        metadata = getEffectsMetadata(testedEffects);
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
