import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {appActions} from './app.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NotificationFacadeService} from '../modules/utils/modules/notification/services/notification-facade.service';
import {Action} from '@ngrx/store';
import {ApiService} from '../services/api.service';
import {AuthFacadeService} from '../modules/auth/services/auth-facade.service';

const APP_EFFECTS_INIT = '[app] Инициализация эффектов';

@Injectable()
export class AppEffects implements OnInitEffects {
    ngrxOnInitEffects(): Action {
        return {type: APP_EFFECTS_INIT};
    }

    getWordsStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(APP_EFFECTS_INIT),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([_, userId]) => this.apiService.getWords(userId)),
            map(words => appActions.getWordsSuccess({data: words})),
        ),
    );

    showNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(appActions.showNotification),
                map(({data}) => this.notificationService.showNotification(data)),
            ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly notificationService: NotificationFacadeService,
        private readonly apiService: ApiService,
        private readonly authFacadeService: AuthFacadeService,
    ) {}
}
