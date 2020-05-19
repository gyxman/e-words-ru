import {AuthFacadeService} from './auth-facade.service';
import {TestBed} from '@angular/core/testing';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthState} from '../store/auth.state';
import {authActions} from '../store/auth.actions';

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
