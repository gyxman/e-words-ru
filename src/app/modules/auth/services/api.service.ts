import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {
    signInWithEmailAndPassword({
        email,
        password,
    }: SignInWithEmailAndPasswordDto): Observable<firebase.auth.UserCredential> {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
    }
}
