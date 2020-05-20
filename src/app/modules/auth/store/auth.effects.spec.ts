import {AuthEffects} from './auth.effects';
import {Observable, of, throwError} from 'rxjs';
import {Action} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthState} from './auth.state';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {ApiService} from '../services/api.service';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {hot} from 'jest-marbles';
import {authActions} from './auth.actions';
import * as firebase from 'firebase';
import {NotificationFacadeService} from '../../utils/modules/notification/services/notification-facade.service';
import {NotificationModel} from '../../utils/modules/notification/models/notification';
import {AuthFacadeService} from '../services/auth-facade.service';

describe('AuthEffects - эффекты по работе с авторизационной группой', () => {
    let testedEffects: AuthEffects;
    let metadata: EffectsMetadata<AuthEffects>;
    let actionsMock$: Observable<Action>;
    let storeMock: MockStore<AuthState>;
    let apiServiceMock: ApiService;
    let authFacadeServiceMock: AuthFacadeService;
    let notificationFacadeServiceMock: NotificationFacadeService;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
        authFacadeServiceMock = mock(AuthFacadeService);
        notificationFacadeServiceMock = mock(NotificationFacadeService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
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
                    provide: NotificationFacadeService,
                    useFactory: () => instance(notificationFacadeServiceMock),
                },
            ],
        });

        testedEffects = TestBed.inject(AuthEffects);
        metadata = getEffectsMetadata(testedEffects);
        storeMock = TestBed.inject(MockStore);
    });

    describe('signInWithEmailAndPasswordStart$ - эффект по началу авторизации с помощью логина и пароля', () => {
        it('Эффект по началу авторизации с помощью логина и пароля диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.signInWithEmailAndPasswordStart$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it(`Если пользователь начинает авторизацию в приложении с помощью логина и пароля и авторизация прошла успешна,
            то диспатчим экшен об успехе`, () => {
            // arrange
            const data = {
                email: 'testEmail@test.ru',
                password: 'testPassword',
            };

            actionsMock$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordStart({data}),
            });

            when(apiServiceMock.signInWithEmailAndPassword(data)).thenReturn(
                of({user: {refreshToken: 'token'}}) as Observable<
                    firebase.auth.UserCredential
                >,
            );

            // act & assert
            const expected$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordSuccess({refreshToken: 'token'}),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });

        it(`Если пользователь начинает авторизацию в приложении с помощью логина и пароля и авторизация возвращает неизвестную ошибку,
            то диспатчим экшен об ошибке и показе нотификации`, () => {
            // arrange
            const data = {
                email: 'testEmail@test.ru',
                password: 'testPassword',
            };

            actionsMock$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordStart({data}),
            });

            when(apiServiceMock.signInWithEmailAndPassword(data)).thenReturn(
                throwError('error'),
            );

            // act & assert
            const expected$ = hot('(xy)', {
                x: authActions.signInWithEmailAndPasswordError(),
                y: authActions.showNotification({
                    data: {
                        text: 'Неизвестная ошибка, попробуйте позже',
                        type: 'error',
                    },
                }),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });

        it(`Если пользователь начинает авторизацию в приложении с помощью логина и пароля и
            авторизация возвращает ошибку неверного логина или пароля,
            то диспатчим экшен об ошибке и показе нотификации`, () => {
            // arrange
            const data = {
                email: 'testEmail@test.ru',
                password: 'testPassword',
            };

            actionsMock$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordStart({data}),
            });

            when(apiServiceMock.signInWithEmailAndPassword(data)).thenReturn(
                throwError({code: 'auth/wrong-password'}),
            );

            // act & assert
            const expected$ = hot('(xy)', {
                x: authActions.signInWithEmailAndPasswordError(),
                y: authActions.showNotification({
                    data: {
                        text: 'Неверный e-mail или пароль',
                        type: 'error',
                    },
                }),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });

        it(`Если пользователь начинает авторизацию в приложении с помощью логина и пароля и
            авторизация возвращает ошибку пользователь не найден,
            то диспатчим экшен об ошибке и показе нотификации`, () => {
            // arrange
            const data = {
                email: 'testEmail@test.ru',
                password: 'testPassword',
            };

            actionsMock$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordStart({data}),
            });

            when(apiServiceMock.signInWithEmailAndPassword(data)).thenReturn(
                throwError({code: 'auth/user-not-found'}),
            );

            // act & assert
            const expected$ = hot('(xy)', {
                x: authActions.signInWithEmailAndPasswordError(),
                y: authActions.showNotification({
                    data: {
                        text: 'Пользователь не найден',
                        type: 'error',
                    },
                }),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });
    });

    describe('signInWithEmailAndPasswordSuccess$ - эффект по установке пользователю сессии', () => {
        it('Эффект по установке пользователю сессии не диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.signInWithEmailAndPasswordSuccess$).toEqual({
                dispatch: false,
                useEffectsErrorHandler: true,
            });
        });

        it(`Если пользователь успешно авторизовался, вызываем метод по установке сессии и передаем токен`, () => {
            // arrange
            actionsMock$ = of(
                authActions.signInWithEmailAndPasswordSuccess({refreshToken: 'token'}),
            );

            // act
            testedEffects.signInWithEmailAndPasswordSuccess$.subscribe();

            // assert
            verify(authFacadeServiceMock.setUserSession('token')).once();
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
                text: 'Неверный e-mail или пароль',
                type: 'error',
            } as NotificationModel;

            actionsMock$ = of(authActions.showNotification({data}));

            // act
            testedEffects.showNotification$.subscribe();

            // assert
            verify(
                notificationFacadeServiceMock.showNotification(deepEqual(data)),
            ).once();
        });
    });
});
