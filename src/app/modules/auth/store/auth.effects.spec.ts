import {AuthEffects} from './auth.effects';
import {Observable, of, throwError} from 'rxjs';
import {Action} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthState} from './auth.state';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {ApiService} from '../services/api.service';
import {instance, mock, when} from 'ts-mockito';
import {hot} from 'jest-marbles';
import {authActions} from './auth.actions';
import * as firebase from 'firebase';

describe('AuthEffects - эффекты по работе с авторизационной группой', () => {
    let testedEffects: AuthEffects;
    let metadata: EffectsMetadata<AuthEffects>;
    let actionsMock$: Observable<Action>;
    let storeMock: MockStore<AuthState>;
    let apiServiceMock: ApiService;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
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

        it('Если пользователь начинает авторизацию в приложении с помощью логина и пароля и авторизация прошла успешна, то диспатчим экшен об успехе', () => {
            // arrange
            const data = {
                email: 'testEmail@test.ru',
                password: 'testPassword',
            };

            actionsMock$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordStart({data}),
            });

            when(apiServiceMock.signInWithEmailAndPassword(data)).thenReturn(
                of({}) as Observable<firebase.auth.UserCredential>,
            );

            // act & assert
            const expected$ = hot('x', {
                x: authActions.signInWithEmailAndPasswordSuccess(),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });

        it('Если пользователь начинает авторизацию в приложении с помощью логина и пароля и авторизация возвращает ошибку, то диспатчим экшен об ошибке', () => {
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
            const expected$ = hot('(x|)', {
                x: authActions.signInWithEmailAndPasswordError(),
            });

            expect(testedEffects.signInWithEmailAndPasswordStart$).toBeObservable(
                expected$,
            );
        });
    });
});
