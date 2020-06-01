import {Injectable} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../store/app.selectors';
import {map} from 'rxjs/operators';

@Injectable()
export class LayoutFacadeService {
    readonly showLoader$ = this.store$
        .select(fromApp.isWordsLoaded)
        .pipe(map(loaded => !loaded));

    constructor(private readonly store$: Store<AppState>) {}
}
