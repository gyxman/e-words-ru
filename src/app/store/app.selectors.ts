import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.state';
import {APP_STATE} from './app.consts';

const getAppState = createFeatureSelector<AppState>(APP_STATE);

// tslint:disable-next-line:no-shadowed-variable
const words = createSelector(getAppState, ({words}) => words);

// tslint:disable-next-line:no-shadowed-variable
const isWordsLoaded = createSelector(getAppState, ({wordsLoaded}) => wordsLoaded);

export const fromApp = {
    words,
    isWordsLoaded,
};
