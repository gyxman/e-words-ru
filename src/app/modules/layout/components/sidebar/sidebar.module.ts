import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {SidebarFacadeService} from '../../services/sidebar-facade.service';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [SidebarComponent],
    exports: [SidebarComponent],
    providers: [SidebarFacadeService],
})
export class SidebarModule {}
