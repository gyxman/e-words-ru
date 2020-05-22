import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class HeaderComponentPo<T> extends PageObject<T> {
    get openMenu(): DebugElement {
        return this.getByAutomationId('open-menu');
    }

    get logo(): DebugElement {
        return this.getByAutomationId('logo');
    }

    get exit(): DebugElement {
        return this.getByAutomationId('exit');
    }
}
