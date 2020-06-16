import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {layoutActions} from './layout.actions';
import {ApiService} from '../../../services/api.service';
import {AuthFacadeService} from '../../auth/services/auth-facade.service';

const LAYOUT_EFFECTS_INIT = '[layout] Инициализация эффектов';

@Injectable()
export class LayoutEffects implements OnInitEffects {
    ngrxOnInitEffects(): Action {
        return {type: LAYOUT_EFFECTS_INIT};
    }

    getWordsStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LAYOUT_EFFECTS_INIT),
            withLatestFrom(this.authFacadeService.userId),
            switchMap(([_, userId]) => this.apiService.getWords(userId)),
            map(words => layoutActions.getWordsSuccess({data: words})),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly apiService: ApiService,
        private readonly authFacadeService: AuthFacadeService,
    ) {}
}
