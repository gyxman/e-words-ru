import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutRoutingModule} from './layout-routing.module';
import {HeaderModule} from './components/header/header.module';
import {AddWordModule} from '../words/components/add-word/add-word.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LayoutRoutingModule,
        HeaderModule,
        AddWordModule,
    ],
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
})
export class LayoutModule {}
