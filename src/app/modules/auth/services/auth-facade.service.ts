import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';
import {authActions} from '../store/auth.actions';
import {fromAuth} from '../store/auth.selectors';

@Injectable()
export class AuthFacadeService {
    constructor(private store$: Store<AuthState>) {}

    showLoader$ = this.store$.select(fromAuth.isLoading);

    signInWithEmail(data: SignInWithEmailAndPassword) {
        this.store$.dispatch(authActions.signInWithEmailAndPasswordStart({data}));
    }
}
