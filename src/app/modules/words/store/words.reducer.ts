import {Action, createReducer, on} from '@ngrx/store';
import {WordsState} from './words.state';
import {wordsActions} from './words.actions';

const initialState: WordsState = {
    words: [],
    wordsLoaded: false,
    isLoading: false,
};

const reducer = createReducer(
    initialState,

    on(wordsActions.getWordsSuccess, (state, {data: words}) => ({
        ...state,
        words,
        wordsLoaded: true,
    })),

    on(wordsActions.removeWordSuccess, (state, {wordId}) => ({
        ...state,
        words: state.words.filter(({id}) => id !== wordId),
    })),

    on(wordsActions.getWordsError, state => ({
        ...state,
        wordsLoaded: false,
    })),

    on(wordsActions.addWordStart, wordsActions.removeWordStart, state => ({
        ...state,
        isLoading: true,
    })),

    on(
        wordsActions.addWordSuccess,
        wordsActions.addWordError,
        wordsActions.removeWordSuccess,
        wordsActions.removeWordError,
        state => ({
            ...state,
            isLoading: false,
        }),
    ),
);

export function wordsReducer(state: WordsState | undefined, action: Action) {
    return reducer(state, action);
}
