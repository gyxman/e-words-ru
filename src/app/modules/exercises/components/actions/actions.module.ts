import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsComponent} from './actions.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [CommonModule, MatButtonModule],
    declarations: [ActionsComponent],
    exports: [ActionsComponent],
})
export class ActionsModule {}
