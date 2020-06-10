import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {EXERCISES_STATE} from './exercises.consts';
import {exercisesReducer} from './exercises.reducer';
import {ExercisesEffects} from './exercises.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(EXERCISES_STATE, exercisesReducer),
        EffectsModule.forFeature([ExercisesEffects]),
    ],
})
export class ExercisesStoreModule {}
