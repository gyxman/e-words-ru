import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ExercisesState} from '../store/exercises.state';
import {exercisesActions} from '../store/exercises.actions';
import {fromExercises} from '../store/exercises.selectors';
import {ExerciseAnswer} from '../models/exercise-answer';

@Injectable()
export class ExercisesFacadeService {
    word$ = this.store$.select(fromExercises.currentWord);
    showLoader$ = this.store$.select(fromExercises.isLoading);

    constructor(private store$: Store<ExercisesState>) {}

    checkAnswer(data: ExerciseAnswer) {
        this.store$.dispatch(exercisesActions.checkAnswer({data}));
    }
}
