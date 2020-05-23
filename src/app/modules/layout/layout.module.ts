import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {LayoutRoutingModule} from './layout-routing.module';
import {HeaderModule} from './components/header/header.module';
import {AddWordModule} from '../words/components/add-word/add-word.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidebarModule} from './components/sidebar/sidebar.module';
import {WordsStoreModule} from '../words/store/words-store.module';
import {WordsFacadeService} from '../words/services/words-facade.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LayoutRoutingModule,
        HeaderModule,
        AddWordModule,
        SidebarModule,
        MatSidenavModule,
        WordsStoreModule,
    ],
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
    providers: [WordsFacadeService],
})
export class LayoutModule {}
