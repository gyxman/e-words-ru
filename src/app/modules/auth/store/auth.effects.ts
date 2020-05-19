import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.state';
import {ApiService} from '../services/api.service';
import {authActions} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {
    signInWithEmailAndPasswordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.signInWithEmailAndPasswordStart),
            switchMap(({data}) => this.apiService.signInWithEmailAndPassword(data)),
            map(() => authActions.signInWithEmailAndPasswordSuccess()),
            catchError(() => of(authActions.signInWithEmailAndPasswordError())),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<AuthState>,
        private readonly apiService: ApiService,
    ) {}
}
