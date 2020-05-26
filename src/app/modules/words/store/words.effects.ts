import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {ApiService} from '../../../services/api.service';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {NotificationFacadeService} from '../../utils/modules/notification/services/notification-facade.service';
import {wordsActions} from './words.actions';
import {WordsState} from './words.state';
import {WordsFacadeService} from '../services/words-facade.service';
import {AuthFacadeService} from '../../auth/services/auth-facade.service';
import {of} from 'rxjs';
import {ManageWordFormService} from '../services/manage-word-form.service';

@Injectable()
export class WordsEffects {
    addWordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(wordsActions.addWordStart),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([{data}, userId]) =>
                this.apiService.addWord({word: data, userId}).pipe(
                    switchMap(() =>
                        of(
                            wordsActions.addWordSuccess(),
                            wordsActions.showNotification({
                                data: {
                                    text: 'Слово успешно добавлено',
                                    type: 'success',
                                },
                            }),
                        ),
                    ),
                    catchError(() =>
                        of(
                            wordsActions.addWordError(),
                            wordsActions.showNotification({
                                data: {
                                    text: 'Ошибка при добавлении слова',
                                    type: 'error',
                                },
                            }),
                        ),
                    ),
                ),
            ),
        ),
    );

    addWordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(wordsActions.addWordSuccess),
                map(() => {
                    this.manageWordFormService.clearForm();
                }),
            ),
        {dispatch: false},
    );

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
        private readonly authFacadeService: AuthFacadeService,
        private readonly wordsFacadeService: WordsFacadeService,
        private readonly manageWordFormService: ManageWordFormService,
        private readonly notificationService: NotificationFacadeService,
    ) {}
}
