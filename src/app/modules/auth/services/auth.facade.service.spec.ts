import {AuthFacadeService} from './auth.facade.service';
import {AuthService} from './auth.service';
import {TestBed} from '@angular/core/testing';
import {instance, mock, when} from 'ts-mockito';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';

describe('AuthFacadeService - сервис по работе с авторизационной группой', () => {
    let testedService: AuthFacadeService;
    let authServiceMock: AuthService;

    beforeEach(() => {
        authServiceMock = mock(AuthService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthFacadeService,
                {provide: AuthService, useFactory: () => instance(authServiceMock)},
            ],
        });

        testedService = TestBed.inject(AuthFacadeService);
    });

    it('Если пользователь начинает авторизацию через email и пароль, то вызываем соответствующий метод в сервисе по работе с авторизацией', () => {
        // arrange
        jest.spyOn(authServiceMock, 'signInWithEmailAndPassword');

        const userData: SignInWithEmailAndPasswordDto = {
            email: 'test@mail.ru',
            password: 'easyPassword',
        };

        when(authServiceMock.signInWithEmailAndPassword(userData)).thenReturn(
            true as any,
        );

        // act
        testedService.loginWithEmail(userData);

        // assert
        expect(authServiceMock.signInWithEmailAndPassword).toHaveBeenCalledWith(userData);
    });
});
