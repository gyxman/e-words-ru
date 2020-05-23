import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {authReducer} from '../../auth/store/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WORDS_STATE} from './words.consts';
import {WordsEffects} from './words.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(WORDS_STATE, authReducer),
        EffectsModule.forFeature([WordsEffects]),
    ],
})
export class WordsStoreModule {}
