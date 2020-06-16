import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LAYOUT_STATE} from './layout.consts';
import {layoutReducer} from './layout.reducer';
import {LayoutEffects} from './layout.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(LAYOUT_STATE, layoutReducer),
        EffectsModule.forFeature([LayoutEffects]),
    ],
})
export class LayoutStoreModule {}
