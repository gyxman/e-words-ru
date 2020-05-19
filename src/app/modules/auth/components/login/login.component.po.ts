import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class LoginComponentPo<T> extends PageObject<T> {
    get form(): DebugElement {
        return this.getByAutomationId('form');
    }

    get emailInput(): HTMLInputElement {
        return this.getByAutomationId('email-input').nativeElement;
    }

    get passwordInput(): HTMLInputElement {
        return this.getByAutomationId('password-input').nativeElement;
    }

    get submitButton(): DebugElement {
        return this.getByAutomationId('submit-button');
    }
}
