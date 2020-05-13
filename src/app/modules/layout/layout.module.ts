import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutRoutingModule} from './layout-routing.module';

@NgModule({
    imports: [CommonModule, RouterModule, LayoutRoutingModule],
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
})
export class LayoutModule {}
