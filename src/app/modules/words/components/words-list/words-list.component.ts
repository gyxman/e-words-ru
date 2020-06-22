import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Word} from '../../models/word';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {WordsFacadeService} from '../../services/words-facade.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-words-list',
    templateUrl: './words-list.component.html',
    styleUrls: ['./words-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsListComponent implements OnInit, OnDestroy {
    readonly columns: string[] = [
        'word',
        'translate',
        'synonyms',
        'date',
        'score',
        'actions',
    ];
    data: MatTableDataSource<Word>;

    destroy$ = new Subject<boolean>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private readonly wordsFacadeService: WordsFacadeService,
    ) {
        iconRegistry.addSvgIcon(
            'edit',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-edit.svg'),
        );
        iconRegistry.addSvgIcon(
            'delete',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-delete.svg'),
        );
    }

    ngOnInit() {
        this.wordsFacadeService.words$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.data = new MatTableDataSource(data);
            this.data.paginator = this.paginator;
            this.data.sort = this.sort;
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    filter(search: string) {
        this.data.filter = search.trim().toLowerCase();

        if (this.data.paginator) {
            this.data.paginator.firstPage();
        }
    }
}
