import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';

@Injectable()
export class ApiService {
    signInWithEmailAndPassword({
        email,
        password,
    }: SignInWithEmailAndPasswordDto): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
