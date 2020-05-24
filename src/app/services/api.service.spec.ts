import {ApiService} from './api.service';
import {TestBed} from '@angular/core/testing';
import * as firebase from 'firebase';
import {instance, mock} from 'ts-mockito';
import {AngularFirestore} from '@angular/fire/firestore';

describe('ApiService - сервис по работе с авторизацией в FireBase', () => {
    let testedService: ApiService;
    let firebaseMock: typeof firebase;
    let dbMock: AngularFirestore;

    beforeEach(() => {
        firebaseMock = require('firebase');
        dbMock = mock(AngularFirestore);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                {provide: firebase, useFactory: () => instance(firebaseMock)},
                {provide: AngularFirestore, useFactory: () => instance(dbMock)},
            ],
        });

        testedService = TestBed.inject(ApiService);
    });

    describe('signInWithEmailAndPassword - метод авторизации с помощью email-а и пароля', () => {
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
});
