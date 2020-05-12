import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AUTH_STATE} from './auth.consts';
import {authReducer} from './auth.reducer';

@NgModule({
    imports: [StoreModule.forFeature(AUTH_STATE, authReducer)],
})
export class AuthStoreModule {}
