import {AuthService} from './auth.service';
import {TestBed} from '@angular/core/testing';
import * as firebase from 'firebase';
import {instance} from 'ts-mockito';

describe('AuthService - сервис по работе с авторизацией в FireBase', () => {
    let testedService: AuthService;
    let firebaseMock: typeof firebase;

    beforeEach(() => {
        firebaseMock = require('firebase');
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                {provide: firebase, useFactory: () => instance(firebaseMock)},
            ],
        });

        testedService = TestBed.inject(AuthService);
    });

    it('Если вызывается метод авторизации с помощью email-а и пароля, то отправляем запрос в firebase с переданными данными', () => {
        // arrange
        firebaseMock.auth = jest.fn().mockReturnValue({
            signInWithEmailAndPassword: jest.fn(),
        }) as any;

        // act
        testedService.signInWithEmailAndPassword({
            email: 'test@mail.ru',
            password: 'easyPassword',
        });

        // assert
        expect(firebaseMock.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            'test@mail.ru',
            'easyPassword',
        );
    });
});
