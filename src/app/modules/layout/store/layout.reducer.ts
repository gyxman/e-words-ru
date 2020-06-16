import {Action, createReducer, on} from '@ngrx/store';
import {LayoutState} from './layout.state';
import {layoutActions} from './layout.actions';

const initialState: LayoutState = {
    words: [],
    wordsLoaded: false,
};

const reducer = createReducer(
    initialState,

    on(layoutActions.getWordsSuccess, (state, {data: words}) => ({
        ...state,
        words,
        wordsLoaded: true,
    })),

    on(layoutActions.getWordsError, state => ({
        ...state,
        wordsLoaded: false,
    })),
);

export function layoutReducer(state: LayoutState | undefined, action: Action) {
    return reducer(state, action);
}
