import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {WORDS_STATE} from './words.consts';
import {WordsEffects} from './words.effects';
import {wordsReducer} from './words.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature(WORDS_STATE, wordsReducer),
        EffectsModule.forFeature([WordsEffects]),
    ],
})
export class WordsStoreModule {}
