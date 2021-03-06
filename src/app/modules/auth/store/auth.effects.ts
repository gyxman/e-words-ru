import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.state';
import {ApiService} from '../../../services/api.service';
import {authActions} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthErrorEnum} from '../enums/auth-error.enum';
import {AuthFacadeService} from '../services/auth-facade.service';
import {Router} from '@angular/router';
import {RouteEnum} from '../../../enums/route.enum';
import {appActions} from '../../../store/app.actions';

@Injectable()
export class AuthEffects {
    signInWithEmailAndPasswordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.signInWithEmailAndPasswordStart),
            switchMap(({data}) =>
                this.apiService.signInWithEmailAndPassword(data).pipe(
                    map(({user: {refreshToken: token, uid: id}}) =>
                        authActions.signInWithEmailAndPasswordSuccess({
                            data: {token, id},
                        }),
                    ),
                    catchError(({code}) =>
                        of(
                            authActions.signInWithEmailAndPasswordError(),
                            appActions.showNotification({
                                data: {
                                    text: AuthErrorEnum[code]
                                        ? AuthErrorEnum[code]
                                        : 'Неизвестная ошибка, попробуйте позже',
                                    type: 'error',
                                },
                            }),
                        ),
                    ),
                ),
            ),
        ),
    );

    signInWithEmailAndPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActions.signInWithEmailAndPasswordSuccess),
                map(({data}) => {
                    this.authFacadeService.setUserInfo(data);
                    this.router.navigate([RouteEnum.User]);
                }),
            ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<AuthState>,
        private readonly apiService: ApiService,
        private readonly authFacadeService: AuthFacadeService,
        private readonly router: Router,
    ) {}
}
