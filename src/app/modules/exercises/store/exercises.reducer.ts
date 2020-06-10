import {Action, createReducer, on} from '@ngrx/store';
import {ExercisesState} from './exercises.state';
import {exercisesActions} from './exercises.actions';

const initialState: ExercisesState = {
    isLoading: false,
    currentWord: null,
};

const reducer = createReducer(
    initialState,

    on(exercisesActions.generateWord, exercisesActions.checkAnswer, state => ({
        ...state,
        isLoading: true,
    })),

    on(exercisesActions.generateWordSuccess, (state, {word}) => ({
        ...state,
        currentWord: word,
    })),

    on(
        exercisesActions.generateWordSuccess,
        exercisesActions.checkAnswerSuccess,
        exercisesActions.checkAnswerError,
        state => ({
            ...state,
            isLoading: false,
        }),
    ),
);

export function exercisesReducer(state: ExercisesState | undefined, action: Action) {
    return reducer(state, action);
}
