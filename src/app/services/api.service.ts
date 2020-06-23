import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {SignInWithEmailAndPasswordDto} from '../modules/auth/dtos/sign-in-with-email-and-password.dto';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {Word} from '../modules/words/models/word';
import {AngularFirestore} from '@angular/fire/firestore';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {map} from 'rxjs/operators';

const MAIN_COLLECTION = 'e-words-ru';
const WORDS_COLLECTION = 'words';

@Injectable()
export class ApiService {
    constructor(private db: AngularFirestore) {}

    signInWithEmailAndPassword({
        email,
        password,
    }: SignInWithEmailAndPasswordDto): Observable<firebase.auth.UserCredential> {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
    }

    getWords(userId: string): Observable<Word[]> {
        return this.db
            .collection(MAIN_COLLECTION)
            .doc(userId)
            .collection('words')
            .get()
            .pipe(
                map(querySnapshot => {
                    const arr = [];

                    querySnapshot.forEach(doc => {
                        arr.push({id: doc.id, ...doc.data()});
                    });

                    return arr;
                }),
            );
    }

    addWord({
        word,
        userId,
    }: {
        word: Omit<Word, 'id'>;
        userId: string;
    }): Observable<DocumentReference> {
        return fromPromise(
            this.db
                .collection(MAIN_COLLECTION)
                .doc(userId)
                .collection(WORDS_COLLECTION)
                .add(word),
        );
    }

    removeWord({wordId, userId}: {wordId: string; userId: string}): Observable<void> {
        return fromPromise(
            this.db
                .collection(MAIN_COLLECTION)
                .doc(userId)
                .collection(WORDS_COLLECTION)
                .doc(wordId)
                .delete(),
        );
    }
}
