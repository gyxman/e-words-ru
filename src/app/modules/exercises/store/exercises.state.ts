import {Word} from '../../words/models/word';

export type ExercisesState = Readonly<{
    isLoading: boolean;
    currentWord: Word | null;
}>;
