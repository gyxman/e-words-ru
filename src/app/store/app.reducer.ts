import {Action, createReducer, on} from '@ngrx/store';
import {AppState} from './app.state';
import {appActions} from './app.actions';

const initialState: AppState = {
    words: [],
    wordsLoaded: false,
};

const reducer = createReducer(
    initialState,

    on(appActions.getWordsSuccess, (state, {data: words}) => ({
        ...state,
        words,
        wordsLoaded: true,
    })),

    on(appActions.getWordsError, state => ({
        ...state,
        wordsLoaded: false,
    })),
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}
