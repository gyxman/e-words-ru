import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
})
export class NotificationModule {}
