import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerComponent} from './timer.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [TimerComponent],
    exports: [TimerComponent],
})
export class TimerModule {}
