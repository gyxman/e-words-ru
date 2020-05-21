import {AuthFacadeService} from '../services/auth-facade.service';
import {Router, UrlTree} from '@angular/router';
import {deepEqual, instance, mock, when} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';
import {cold} from 'jest-marbles';
import {LoginGuard} from './login.guard';

describe('LoginGuard - гард, проверяющий можно ли пользователю отображать авторизационную группу', () => {
    let testedGuard: LoginGuard;
    let authFacadeServiceMock: AuthFacadeService;
    let routerMock: Router;
    let isAuthenticated$: BehaviorSubject<boolean>;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);
        routerMock = mock(Router);

        isAuthenticated$ = new BehaviorSubject(false);
    });

    beforeEach(() => {
        when(authFacadeServiceMock.isAuthenticated).thenReturn(isAuthenticated$);
    });

    beforeEach(() => {
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
    });

    it('Если пользователь авторизован в приложении, то направляем пользователя на страниицу в авторизованной зоне', () => {
        // arrange
        isAuthenticated$.next(true);

        when(routerMock.createUrlTree(deepEqual(['user']))).thenReturn({} as UrlTree);

        // act & assert
        expect(testedGuard.canActivate()).toBeObservable(cold('(x|)', {x: {}}));
    });

    it('Если пользователь не авторизован в приложении, то возвращаем положительный результат', () => {
        // arrange
        isAuthenticated$.next(false);

        // act & assert
        expect(testedGuard.canActivate()).toBeObservable(cold('(x|)', {x: true}));
    });
});
