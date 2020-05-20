import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.state';
import {ApiService} from '../services/api.service';
import {authActions} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NotificationFacadeService} from '../../utils/modules/notification/services/notification-facade.service';
import {AuthErrorEnum} from '../enums/auth-error.enum';

@Injectable()
export class AuthEffects {
    signInWithEmailAndPasswordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.signInWithEmailAndPasswordStart),
            switchMap(({data}) => this.apiService.signInWithEmailAndPassword(data)),
            map(() => {
                return authActions.signInWithEmailAndPasswordSuccess();
            }),
            catchError(({code}) =>
                of(
                    authActions.signInWithEmailAndPasswordError(),
                    authActions.showNotification({
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
    );

    showNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActions.showNotification),
                map(({data}) => this.notificationService.showNotification(data)),
            ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<AuthState>,
        private readonly apiService: ApiService,
        private readonly notificationService: NotificationFacadeService,
    ) {}
}
