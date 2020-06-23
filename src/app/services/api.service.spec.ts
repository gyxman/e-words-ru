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
import {of} from 'rxjs';
import {cold} from 'jest-marbles';

describe('ApiService - сервис по работе с авторизацией в FireBase', () => {
    let testedService: ApiService;
    let firebaseMock: typeof firebase;
    let dbMock: AngularFirestore;
    let angularFirestoreCollectionMock1: AngularFirestoreCollection;
    let angularFirestoreDocumentMock: AngularFirestoreDocument;
    let angularFirestoreCollectionMock2: AngularFirestoreCollection;
    let angularFirestoreDocumentMock2: AngularFirestoreDocument;

    beforeEach(() => {
        firebaseMock = require('firebase');
        dbMock = mock(AngularFirestore);
        angularFirestoreCollectionMock1 = mock(AngularFirestoreCollection);
        angularFirestoreDocumentMock = mock(AngularFirestoreDocument);
        angularFirestoreCollectionMock2 = mock(AngularFirestoreCollection);
        angularFirestoreDocumentMock2 = mock(AngularFirestoreDocument);
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
                {
                    provide: AngularFirestoreDocument,
                    useFactory: () => instance(angularFirestoreDocumentMock2),
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

    describe('getWords - метод получения слов из базы данных', () => {
        it('Если вызывается метод на получение слов из базы данных, то передаем полученные слова в массиве', () => {
            // arrange
            const data = [
                {
                    id: 'wordId',
                    data: () =>
                        ({
                            russianWord: 'russianWord',
                            englishWord: 'englishWord',
                        } as Word),
                },
            ] as any;

            when(dbMock.collection('e-words-ru')).thenReturn(
                instance(angularFirestoreCollectionMock1),
            );
            when(angularFirestoreCollectionMock1.doc('userId')).thenReturn(
                instance(angularFirestoreDocumentMock),
            );
            when(angularFirestoreDocumentMock.collection('words')).thenReturn(
                instance(angularFirestoreCollectionMock2),
            );
            when(angularFirestoreCollectionMock2.get()).thenReturn(of(data));

            // act & assert
            expect(testedService.getWords('userId')).toBeObservable(
                cold('(x|)', {
                    x: [
                        {
                            id: 'wordId',
                            russianWord: 'russianWord',
                            englishWord: 'englishWord',
                        },
                    ],
                }),
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

    describe('removeWord - метод удаления слова из базы данных', () => {
        it('Если вызывается метод удаления слова, то отправляем запрос в firebase с переданными данными', () => {
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
            when(angularFirestoreCollectionMock2.doc('wordId')).thenReturn(
                instance(angularFirestoreDocumentMock2),
            );

            // act
            testedService.removeWord({wordId: 'wordId', userId: 'userId'});

            // assert
            verify(dbMock.collection('e-words-ru')).once();
            verify(angularFirestoreCollectionMock1.doc('userId')).once();
            verify(angularFirestoreDocumentMock.collection('words')).once();
            verify(angularFirestoreCollectionMock2.doc('wordId')).once();
            verify(angularFirestoreDocumentMock2.delete()).once();
        });
    });
});
