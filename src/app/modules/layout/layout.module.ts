import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutRoutingModule} from './layout-routing.module';
import {HeaderModule} from './components/header/header.module';

@NgModule({
    imports: [CommonModule, RouterModule, LayoutRoutingModule, HeaderModule],
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
})
export class LayoutModule {}
