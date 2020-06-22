import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {fromWords} from '../../words/store/words.selectors';
import {WordsState} from '../../words/store/words.state';

@Injectable()
export class LayoutFacadeService {
    readonly showLoader$ = this.store$
        .select(fromWords.isWordsLoaded)
        .pipe(map(loaded => !loaded));

    constructor(private readonly store$: Store<WordsState>) {}
}
