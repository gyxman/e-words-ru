import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';
import {MockedComponent} from 'ng-mocks';
import {LoaderComponent} from '../../../utils/components/loader/loader.component';

export class LoginComponentPo<T> extends PageObject<T> {
    get loader(): MockedComponent<LoaderComponent> {
        return this.getByAutomationId('loader').componentInstance;
    }

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
