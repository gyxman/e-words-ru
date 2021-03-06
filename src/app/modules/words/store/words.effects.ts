import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {ApiService} from '../../../services/api.service';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {wordsActions} from './words.actions';
import {WordsState} from './words.state';
import {WordsFacadeService} from '../services/words-facade.service';
import {AuthFacadeService} from '../../auth/services/auth-facade.service';
import {of} from 'rxjs';
import {ManageWordFormService} from '../services/manage-word-form.service';
import {appActions} from '../../../store/app.actions';

@Injectable()
export class WordsEffects {
    getWordsStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(wordsActions.getWordsStart),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([_, userId]) => this.apiService.getWords(userId)),
            map(words => wordsActions.getWordsSuccess({data: words})),
        ),
    );

    addWordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(wordsActions.addWordStart),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([{data}, userId]) =>
                this.apiService.addWord({word: data, userId}).pipe(
                    switchMap(({id}) =>
                        of(
                            wordsActions.addWordSuccess({data: {id, ...data}}),
                            appActions.showNotification({
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
                            appActions.showNotification({
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

    removeWordStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(wordsActions.removeWordStart),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([{wordId}, userId]) =>
                this.apiService.removeWord({wordId, userId}).pipe(
                    switchMap(() =>
                        of(
                            wordsActions.removeWordSuccess({wordId}),
                            appActions.showNotification({
                                data: {
                                    text: 'Слово успешно удалено',
                                    type: 'success',
                                },
                            }),
                        ),
                    ),
                    catchError(() =>
                        of(
                            wordsActions.removeWordError(),
                            appActions.showNotification({
                                data: {
                                    text: 'Ошибка при удалении слова',
                                    type: 'error',
                                },
                            }),
                        ),
                    ),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store<WordsState>,
        private readonly apiService: ApiService,
        private readonly authFacadeService: AuthFacadeService,
        private readonly wordsFacadeService: WordsFacadeService,
        private readonly manageWordFormService: ManageWordFormService,
    ) {}
}
