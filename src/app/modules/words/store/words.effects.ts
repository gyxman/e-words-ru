import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {ApiService} from '../../../services/api.service';
import {map} from 'rxjs/operators';
import {NotificationFacadeService} from '../../utils/modules/notification/services/notification-facade.service';
import {wordsActions} from './words.actions';
import {WordsState} from './words.state';
import {WordsFacadeService} from '../services/words-facade.service';

@Injectable()
export class WordsEffects {
    showNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(wordsActions.showNotification),
                map(({data}) => this.notificationService.showNotification(data)),
            ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<WordsState>,
        private readonly apiService: ApiService,
        private readonly wordsFacadeService: WordsFacadeService,
        private readonly notificationService: NotificationFacadeService,
    ) {}
}
