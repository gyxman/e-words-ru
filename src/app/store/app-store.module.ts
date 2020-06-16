import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';

@NgModule({
    imports: [EffectsModule.forFeature([AppEffects])],
})
export class AppStoreModule {}
