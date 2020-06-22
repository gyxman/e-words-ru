import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {wordsActions} from '../../words/store/words.actions';

const LAYOUT_EFFECTS_INIT = '[layout] Инициализация эффектов';

@Injectable()
export class LayoutEffects implements OnInitEffects {
    ngrxOnInitEffects(): Action {
        return {type: LAYOUT_EFFECTS_INIT};
    }

    getWordsStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LAYOUT_EFFECTS_INIT),
            map(() => wordsActions.getWordsStart()),
        ),
    );

    constructor(private readonly actions$: Actions) {}
}
