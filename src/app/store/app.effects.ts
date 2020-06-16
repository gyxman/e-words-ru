import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {appActions} from './app.actions';
import {map} from 'rxjs/operators';
import {NotificationFacadeService} from '../modules/utils/modules/notification/services/notification-facade.service';

@Injectable()
export class AppEffects {
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
    ) {}
}
