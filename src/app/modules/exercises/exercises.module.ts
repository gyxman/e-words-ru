import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesComponent} from './exercises.component';
import {ExercisesRoutingModule} from './exercises-routing.module';
import {InputRussianModule} from './components/input-russian/input-russian.module';
import {ExercisesFacadeService} from './services/exercises-facade.service';
import {ExercisesStoreModule} from './store/exercises-store.module';
import {LoaderModule} from '../utils/components/loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        ExercisesRoutingModule,
        ExercisesStoreModule,
        InputRussianModule,
        LoaderModule,
    ],
    declarations: [ExercisesComponent],
    providers: [ExercisesFacadeService],
    exports: [ExercisesComponent],
})
export class ExercisesModule {}
