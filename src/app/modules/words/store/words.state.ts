import {Word} from '../models/word';

export type WordsState = Readonly<{
    words: Word[];
    wordsLoaded: boolean;
    isLoading: boolean;
}>;
