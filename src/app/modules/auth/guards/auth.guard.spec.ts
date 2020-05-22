import {AuthGuard} from './auth.guard';
import {AuthFacadeService} from '../services/auth-facade.service';
import {Router} from '@angular/router';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';

describe('AuthGuard - гард, проверяющий можно ли пользователю отображать защищенную зону', () => {
    let testedGuard: AuthGuard;
    let authFacadeServiceMock: AuthFacadeService;
    let routerMock: Router;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);
        routerMock = mock(Router);
    });

    function compileGuard() {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: AuthFacadeService,
                    useFactory: () => instance(authFacadeServiceMock),
                },
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
            ],
        });

        testedGuard = TestBed.inject(AuthGuard);
    }

    it('Если пользователь авторизован в приложении, то возвращаем положительный результат', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(true);

        compileGuard();

        // act & assert
        expect(testedGuard.canLoad()).toBe(true);
    });

    it('Если пользователь не авторизован в приложении, то направляем пользователя на страниицу логина', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(false);

        compileGuard();

        // act
        testedGuard.canLoad();

        // assert
        verify(
            routerMock.navigate(
                deepEqual(['login']),
                deepEqual({
                    queryParams: deepEqual({loginAgain: true}),
                }),
            ),
        ).once();
    });

    it('Если пользователь не авторизован в приложении, то возвращаем отрицательный результат', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(false);

        compileGuard();

        // act & assert
        expect(testedGuard.canLoad()).toBe(false);
    });
});
