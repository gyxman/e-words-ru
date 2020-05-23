import {Injectable} from '@angular/core';
import {Word} from '../models/word';
import {Store} from '@ngrx/store';
import {WordsState} from '../store/words.state';
import {wordsActions} from '../store/words.actions';

@Injectable()
export class WordsFacadeService {
    constructor(private store$: Store<WordsState>) {}

    addWord(data: Word) {
        this.store$.dispatch(wordsActions.addWordStart({data}));
    }
}
