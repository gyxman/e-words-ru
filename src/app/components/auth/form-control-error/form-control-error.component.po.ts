import {PageObject} from '../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class FormControlErrorComponentPo<T> extends PageObject<T> {
    get errorRequired(): DebugElement {
        return this.getByAutomationId('error-required');
    }

    get errorEmail(): DebugElement {
        return this.getByAutomationId('error-email');
    }

    get errorMinlength(): DebugElement {
        return this.getByAutomationId('error-minlength');
    }
}
