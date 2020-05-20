import {AuthFacadeService} from './auth-facade.service';
import {TestBed} from '@angular/core/testing';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthState} from '../store/auth.state';
import {authActions} from '../store/auth.actions';
import {fromAuth} from '../store/auth.selectors';
import {cold} from 'jest-marbles';

describe('AuthFacadeService - сервис по работе с авторизационной группой', () => {
    let testedService: AuthFacadeService;
    let storeMock: MockStore<AuthState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthFacadeService, provideMockStore()],
        });

        testedService = TestBed.inject(AuthFacadeService);
        storeMock = TestBed.inject(MockStore);
    });

    describe('showLoader$ - информация о показе лоадера', () => {
        it('Если в сторе информация о показе лоадера отрицательная, то она возвращается', () => {
            // arrange
            storeMock.overrideSelector(fromAuth.isLoading, false);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(
                cold('x', {
                    x: false,
                }),
            );
        });

        it('Если в сторе информация о показе лоадера положительная, то она возвращается', () => {
            // arrange
            storeMock.overrideSelector(fromAuth.isLoading, true);

            // act & assert
            expect(testedService.showLoader$).toBeObservable(
                cold('x', {
                    x: true,
                }),
            );
        });
    });

    it('Если пользователь начинает авторизацию через email и пароль, то диспатчим экшен о начале авторизации', () => {
        // arrange
        jest.spyOn(storeMock, 'dispatch');

        const data: SignInWithEmailAndPasswordDto = {
            email: 'test@mail.ru',
            password: 'easyPassword',
        };

        // act
        testedService.signInWithEmail(data);

        // assert
        expect(storeMock.dispatch).toHaveBeenCalledWith(
            authActions.signInWithEmailAndPasswordStart({data}),
        );
    });
});
