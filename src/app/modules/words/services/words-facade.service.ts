import {Injectable} from '@angular/core';
import {Word} from '../models/word';
import {Store} from '@ngrx/store';
import {WordsState} from '../store/words.state';
import {wordsActions} from '../store/words.actions';
import {fromWords} from '../store/words.selectors';

@Injectable()
export class WordsFacadeService {
    showLoader$ = this.store$.select(fromWords.isLoading);
    words$ = this.store$.select(fromWords.words);

    constructor(private store$: Store<WordsState>) {}

    addWord(data: Word) {
        this.store$.dispatch(wordsActions.addWordStart({data}));
    }
}
