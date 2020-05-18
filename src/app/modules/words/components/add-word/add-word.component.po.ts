import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';

export class AddWordComponentPo<T> extends PageObject<T> {
    get form(): DebugElement {
        return this.getByAutomationId('form');
    }

    get englishWord(): HTMLInputElement {
        return this.getByAutomationId('english-word').nativeElement;
    }

    get russianWord(): HTMLInputElement {
        return this.getByAutomationId('russian-word').nativeElement;
    }

    get addSynonymButton(): DebugElement {
        return this.getByAutomationId('add-synonym-button');
    }

    get submitButton(): DebugElement {
        return this.getByAutomationId('submit-button');
    }
}
