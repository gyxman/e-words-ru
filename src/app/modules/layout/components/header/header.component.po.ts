import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class HeaderComponentPo<T> extends PageObject<T> {
    get toggle(): DebugElement {
        return this.getByAutomationId('toggle');
    }

    get logo(): DebugElement {
        return this.getByAutomationId('logo');
    }

    get exit(): DebugElement {
        return this.getByAutomationId('exit');
    }
}
