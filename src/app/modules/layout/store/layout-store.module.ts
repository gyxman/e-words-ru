import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {LayoutEffects} from './layout.effects';

@NgModule({
    imports: [EffectsModule.forFeature([LayoutEffects])],
})
export class LayoutStoreModule {}
