import {AuthGuard} from './auth.guard';
import {AuthFacadeService} from '../services/auth-facade.service';
import {Router, UrlTree} from '@angular/router';
import {deepEqual, instance, mock, when} from 'ts-mockito';
import {TestBed} from '@angular/core/testing';
import {BehaviorSubject, Subject} from 'rxjs';
import {cold} from 'jest-marbles';

describe('AuthGuard - гард, проверяющий авторизован ли пользователь в приложении', () => {
    let testedGuard: AuthGuard;
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
    });

    it('Если пользователь авторизован в приложении, то возвращаем положительный результат', () => {
        // arrange
        isAuthenticated$.next(true);

        // act & assert
        expect(testedGuard.canActivate()).toBeObservable(cold('(x|)', {x: true}));
    });

    it('Если пользователь не авторизован в приложении, то направляем пользователя на страниицу логина', () => {
        // arrange
        isAuthenticated$.next(false);

        when(
            routerMock.createUrlTree(
                deepEqual(['login']),
                deepEqual({
                    queryParams: deepEqual({loginAgain: true}),
                }),
            ),
        ).thenReturn({} as UrlTree);

        // act & assert
        expect(testedGuard.canActivate()).toBeObservable(cold('(x|)', {x: {}}));
    });
});
