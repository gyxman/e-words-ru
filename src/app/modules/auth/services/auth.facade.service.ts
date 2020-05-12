import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';

@Injectable()
export class AuthFacadeService {
    constructor(private authService: AuthService) {}

    loginWithEmail(
        data: SignInWithEmailAndPasswordDto,
    ): Promise<firebase.auth.UserCredential> {
        return this.authService.signInWithEmailAndPassword(data);
    }
}
