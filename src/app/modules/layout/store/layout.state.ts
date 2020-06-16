import {Word} from '../../words/models/word';

export type LayoutState = Readonly<{
    words: Word[];
    wordsLoaded: boolean;
}>;
