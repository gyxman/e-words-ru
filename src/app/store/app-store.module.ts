import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {APP_STATE} from './app.consts';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(APP_STATE, appReducer),
        EffectsModule.forFeature([AppEffects]),
    ],
})
export class AppStoreModule {}
