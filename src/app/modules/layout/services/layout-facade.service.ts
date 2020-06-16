import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {LayoutState} from '../store/layout.state';
import {fromLayout} from '../store/layout.selectors';

@Injectable()
export class LayoutFacadeService {
    readonly showLoader$ = this.store$
        .select(fromLayout.isWordsLoaded)
        .pipe(map(loaded => !loaded));

    constructor(private readonly store$: Store<LayoutState>) {}
}
