import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    signInWithEmailAndPassword({email, password}): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
