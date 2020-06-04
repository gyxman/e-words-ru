import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class ActionsComponentPo<T> extends PageObject<T> {
    get submitButton(): DebugElement {
        return this.getByAutomationId('submit-button');
    }
}
