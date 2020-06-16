import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LayoutState} from './layout.state';
import {LAYOUT_STATE} from './layout.consts';

const getLayoutState = createFeatureSelector<LayoutState>(LAYOUT_STATE);

// tslint:disable-next-line:no-shadowed-variable
const words = createSelector(getLayoutState, ({words}) => words);

// tslint:disable-next-line:no-shadowed-variable
const isWordsLoaded = createSelector(getLayoutState, ({wordsLoaded}) => wordsLoaded);

export const fromLayout = {
    words,
    isWordsLoaded,
};
