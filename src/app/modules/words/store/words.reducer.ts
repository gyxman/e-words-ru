import {Action, createReducer, on} from '@ngrx/store';
import {WordsState} from './words.state';
import {wordsActions} from './words.actions';

const initialState: WordsState = {
    isLoading: false,
};

const reducer = createReducer(
    initialState,

    on(wordsActions.addWordStart, state => ({
        ...state,
        isLoading: true,
    })),

    on(wordsActions.addWordSuccess, wordsActions.addWordError, state => ({
        ...state,
        isLoading: false,
    })),
);

export function wordsReducer(state: WordsState | undefined, action: Action) {
    return reducer(state, action);
}
