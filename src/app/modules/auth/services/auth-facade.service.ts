import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';
import {authActions} from '../store/auth.actions';
import {fromAuth} from '../store/auth.selectors';
import {Observable, of} from 'rxjs';

const AUTH_TOKEN = 'e-words-user-token';

@Injectable()
export class AuthFacadeService {
    showLoader$ = this.store$.select(fromAuth.isLoading);

    constructor(private store$: Store<AuthState>) {}

    get isAuthenticated(): Observable<boolean> {
        return of(!!localStorage.getItem(AUTH_TOKEN));
    }

    signInWithEmail(data: SignInWithEmailAndPassword) {
        this.store$.dispatch(authActions.signInWithEmailAndPasswordStart({data}));
    }

    signOut() {
        this.updateToken(null);
    }

    setUserSession(token: string) {
        this.updateToken(token);
    }

    private updateToken(token: string | null) {
        if (token) {
            localStorage.setItem(AUTH_TOKEN, token);
        } else {
            localStorage.clear();
        }
    }
}
