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

    describe('isAuthenticated - метод проверки, что пользователь авторизован', () => {
        it('Если пользователь не авторизован, то возвращаем отрицательный результат', () => {
            // assert
            expect(testedService.isAuthenticated).toBeObservable(
                cold('(x|)', {x: false}),
            );
        });

        it('Если пользователь авторизован, то возвращаем положительный результат', () => {
            // arrange
            localStorage.setItem('e-words-user-token', 'token');

            // act && assert
            expect(testedService.isAuthenticated).toBeObservable(cold('(x|)', {x: true}));
        });
    });

    describe('signInWithEmail - авторизация с помощью e-mail и пароля', () => {
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

    describe('signOut - метод выхода из приложения', () => {
        it('Если пользователь хочет выйти из приложения, сбрасываем его сессию и очищаем localStorage', () => {
            // arrange
            localStorage.setItem('e-words-user-token', 'token');

            // act
            testedService.signOut();

            // assert
            expect(localStorage.getItem('e-words-user-token')).toBeNull();
        });
    });

    describe('setUserSession - метод установки сессии пользователя', () => {
        it('Если пользователь успешно авторизовался в приложении, установим сессию', () => {
            // act
            testedService.setUserSession('token');

            // assert
            expect(localStorage.getItem('e-words-user-token')).toBe('token');
        });
    });
});
