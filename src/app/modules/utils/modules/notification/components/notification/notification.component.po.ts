import {PageObject} from '../../../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class NotificationComponentPo<T> extends PageObject<T> {
    get icon(): DebugElement {
        return this.getByAutomationId('icon');
    }
}
