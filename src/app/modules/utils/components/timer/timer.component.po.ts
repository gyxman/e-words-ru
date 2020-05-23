import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class TimerComponentPo<T> extends PageObject<T> {
    get time(): DebugElement {
        return this.getByAutomationId('time');
    }
}
