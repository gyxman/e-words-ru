import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AUTH_STATE} from './auth.consts';
import {authReducer} from './auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(AUTH_STATE, authReducer),
        EffectsModule.forFeature([AuthEffects]),
    ],
})
export class AuthStoreModule {}
