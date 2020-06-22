import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WordsListComponent} from './words-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
    ],
    declarations: [WordsListComponent],
    exports: [WordsListComponent],
})
export class WordsListModule {}
