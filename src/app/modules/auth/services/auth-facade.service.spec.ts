import {AuthFacadeService} from './auth-facade.service';
import {ApiService} from './api.service';
import {TestBed} from '@angular/core/testing';
import {instance, mock, when} from 'ts-mockito';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';

describe('AuthFacadeService - сервис по работе с авторизационной группой', () => {
    let testedService: AuthFacadeService;
    let apiServiceMock: ApiService;

    beforeEach(() => {
        apiServiceMock = mock(ApiService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthFacadeService,
                {provide: ApiService, useFactory: () => instance(apiServiceMock)},
            ],
        });

        testedService = TestBed.inject(AuthFacadeService);
    });

    it('Если пользователь начинает авторизацию через email и пароль, то вызываем соответствующий метод в сервисе по работе с авторизацией', () => {
        // arrange
        jest.spyOn(apiServiceMock, 'signInWithEmailAndPassword');

        const userData: SignInWithEmailAndPasswordDto = {
            email: 'test@mail.ru',
            password: 'easyPassword',
        };

        when(apiServiceMock.signInWithEmailAndPassword(userData)).thenReturn(true as any);

        // act
        testedService.loginWithEmail(userData);

        // assert
        expect(apiServiceMock.signInWithEmailAndPassword).toHaveBeenCalledWith(userData);
    });
});
