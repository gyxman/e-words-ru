import {AuthFacadeService} from '../services/auth-facade.service';
import {Router} from '@angular/router';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';
import {LoginGuard} from './login.guard';
import {RouteEnum} from '../../../enums/route.enum';

describe('LoginGuard - гард, проверяющий можно ли пользователю отображать авторизационную группу', () => {
    let testedGuard: LoginGuard;
    let authFacadeServiceMock: AuthFacadeService;
    let routerMock: Router;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);
        routerMock = mock(Router);
    });

    function compileGuard() {
        TestBed.configureTestingModule({
            providers: [
                LoginGuard,
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

        testedGuard = TestBed.inject(LoginGuard);
    }

    it('Если пользователь авторизован в приложении, то возвращаем отрицательный результат', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(true);

        compileGuard();

        // act & assert
        expect(testedGuard.canLoad()).toBe(false);
    });

    it('Если пользователь авторизован в приложении, то направляем пользователя на страниицу в авторизованной зоне', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(true);

        compileGuard();

        // act
        testedGuard.canLoad();

        // assert
        verify(routerMock.navigate(deepEqual([RouteEnum.User]))).once();
    });

    it('Если пользователь авторизован в приложении, то возвращаем положительный результат', () => {
        // arrange
        when(authFacadeServiceMock.isAuthenticated).thenReturn(false);

        compileGuard();

        // act & assert
        expect(testedGuard.canLoad()).toBe(true);
    });
});
