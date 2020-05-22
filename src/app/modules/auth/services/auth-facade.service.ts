import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {SignInWithEmailAndPassword} from '../models/sign-in-with-email-and-password';
import {authActions} from '../store/auth.actions';
import {fromAuth} from '../store/auth.selectors';
import {Observable, of} from 'rxjs';
import {LocalstorageUserInfo} from '../models/localstorage-user-info';
import {AUTH_ID, AUTH_TOKEN} from '../consts/auth.consts';

@Injectable({providedIn: 'root'})
export class AuthFacadeService {
    showLoader$ = this.store$.select(fromAuth.isLoading);

    constructor(private store$: Store<AuthState>) {}

    get isAuthenticated(): boolean {
        return !!localStorage.getItem(AUTH_TOKEN);
    }

    get isAuthenticatedAsync(): Observable<boolean> {
        return of(this.isAuthenticated);
    }

    get userId(): Observable<string | null> {
        return of(localStorage.getItem(AUTH_ID));
    }

    signInWithEmail(data: SignInWithEmailAndPassword) {
        this.store$.dispatch(authActions.signInWithEmailAndPasswordStart({data}));
    }

    signOut() {
        this.updateToken(null);
        this.updateUserId(null);
    }

    setUserInfo({token, id}: LocalstorageUserInfo) {
        this.updateToken(token);
        this.updateUserId(id);
    }

    private updateToken(token: string | null) {
        if (token) {
            localStorage.setItem(AUTH_TOKEN, token);
        } else {
            localStorage.removeItem(AUTH_TOKEN);
        }
    }

    private updateUserId(id: string | null) {
        if (id) {
            localStorage.setItem(AUTH_ID, id);
        } else {
            localStorage.removeItem(AUTH_ID);
        }
    }
}
