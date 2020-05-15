import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class LoaderComponentPo<T> extends PageObject<T> {
    get content(): DebugElement {
        return this.getByAutomationId('content');
    }

    get loader(): DebugElement {
        return this.getByAutomationId('loader');
    }

    get overlay(): DebugElement {
        return this.getByAutomationId('overlay');
    }

    get spinner(): DebugElement {
        return this.getByAutomationId('spinner');
    }
}
