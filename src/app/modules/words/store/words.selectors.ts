import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WordsState} from './words.state';
import {WORDS_STATE} from './words.consts';

const getWordsState = createFeatureSelector<WordsState>(WORDS_STATE);

// tslint:disable-next-line:no-shadowed-variable
const words = createSelector(getWordsState, ({words}) => words);

// tslint:disable-next-line:no-shadowed-variable
const isWordsLoaded = createSelector(getWordsState, ({wordsLoaded}) => wordsLoaded);

// tslint:disable-next-line:no-shadowed-variable
const isLoading = createSelector(getWordsState, ({isLoading}) => isLoading);

export const fromWords = {
    words,
    isWordsLoaded,
    isLoading,
};
