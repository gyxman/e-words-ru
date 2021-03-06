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
import {DashboardModule} from './components/dashboard/dashboard.module';
import {CatalogModule} from './components/catalog/catalog.module';
import {LoaderModule} from '../utils/components/loader/loader.module';
import {LayoutFacadeService} from './services/layout-facade.service';
import {LayoutStoreModule} from './store/layout-store.module';
import {WordsListModule} from '../words/components/words-list/words-list.module';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getDutchPaginatorIntl} from './langs/dutch-paginator-intl';

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
        DashboardModule,
        CatalogModule,
        LoaderModule,
        LayoutStoreModule,
        WordsListModule,
    ],
    declarations: [LayoutComponent],
    exports: [LayoutComponent],
    providers: [
        WordsFacadeService,
        LayoutFacadeService,
        {provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl()},
    ],
})
export class LayoutModule {}
