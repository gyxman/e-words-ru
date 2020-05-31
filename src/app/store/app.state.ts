import {Word} from '../modules/words/models/word';

export type AppState = Readonly<{
    words: Word[];
    wordsLoaded: boolean;
}>;
