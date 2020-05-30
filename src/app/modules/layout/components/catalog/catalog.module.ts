import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CatalogComponent],
    exports: [CatalogComponent],
})
export class CatalogModule {}
