import {ApiService} from './api.service';
import {TestBed} from '@angular/core/testing';
import * as firebase from 'firebase';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {Word} from '../modules/words/models/word';

describe('ApiService - сервис по работе с авторизацией в FireBase', () => {
    let testedService: ApiService;
    let firebaseMock: typeof firebase;
    let dbMock: AngularFirestore;
    let angularFirestoreCollectionMock1: AngularFirestoreCollection;
    let angularFirestoreDocumentMock: AngularFirestoreDocument;
    let angularFirestoreCollectionMock2: AngularFirestoreCollection;

    beforeEach(() => {
        firebaseMock = require('firebase');
        dbMock = mock(AngularFirestore);
        angularFirestoreCollectionMock1 = mock(AngularFirestoreCollection);
        angularFirestoreDocumentMock = mock(AngularFirestoreDocument);
        angularFirestoreCollectionMock2 = mock(AngularFirestoreCollection);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
                {provide: firebase, useFactory: () => instance(firebaseMock)},
                {provide: AngularFirestore, useFactory: () => instance(dbMock)},
                {
                    provide: AngularFirestoreCollection,
                    useFactory: () => instance(angularFirestoreCollectionMock1),
                },
                {
                    provide: AngularFirestoreDocument,
                    useFactory: () => instance(angularFirestoreDocumentMock),
                },
                {
                    provide: AngularFirestoreCollection,
                    useFactory: () => instance(angularFirestoreCollectionMock2),
                },
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

    describe('addWord - метод добавления слова на изучение в базу данных', () => {
        it('Если вызывается метод добавления слова на изучение, то отправляем запрос в firebase с переданными данными', () => {
            // arrange
            when(dbMock.collection('e-words-ru')).thenReturn(
                instance(angularFirestoreCollectionMock1),
            );
            when(angularFirestoreCollectionMock1.doc('userId')).thenReturn(
                instance(angularFirestoreDocumentMock),
            );
            when(angularFirestoreDocumentMock.collection('words')).thenReturn(
                instance(angularFirestoreCollectionMock2),
            );

            // act
            testedService.addWord({word: {id: 'wordId'} as Word, userId: 'userId'});

            // assert
            verify(dbMock.collection('e-words-ru')).once();
            verify(angularFirestoreCollectionMock1.doc('userId')).once();
            verify(angularFirestoreDocumentMock.collection('words')).once();
            verify(angularFirestoreCollectionMock2.add(deepEqual({id: 'wordId'}))).once();
        });
    });
});
