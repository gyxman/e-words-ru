import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import * as firebase from 'firebase';
import {SignInWithEmailAndPasswordDto} from '../dtos/sign-in-with-email-and-password.dto';

@Injectable()
export class AuthFacadeService {
    constructor(private apiService: ApiService) {}

    loginWithEmail(
        data: SignInWithEmailAndPasswordDto,
    ): Promise<firebase.auth.UserCredential> {
        return this.apiService.signInWithEmailAndPassword(data);
    }
}
