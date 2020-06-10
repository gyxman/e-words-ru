import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ExercisesState} from './exercises.state';
import {EXERCISES_STATE} from './exercises.consts';

const getExercisesState = createFeatureSelector<ExercisesState>(EXERCISES_STATE);

// tslint:disable-next-line:no-shadowed-variable
const isLoading = createSelector(getExercisesState, ({isLoading}) => isLoading);

// tslint:disable-next-line:no-shadowed-variable
const currentWord = createSelector(getExercisesState, ({currentWord}) => currentWord);

export const fromExercises = {
    isLoading,
    currentWord,
};
