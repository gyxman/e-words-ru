import {PageObject} from '../../../../testing/page-object';
import {DebugElement} from '@angular/core';
import {MockedComponent} from 'ng-mocks';
import {LoaderComponent} from '../../../utils/components/loader/loader.component';
import {ActionsComponent} from '../actions/actions.component';

export class InputRussianComponentPo<T> extends PageObject<T> {
    get loaderComponent(): MockedComponent<LoaderComponent> {
        return this.getByAutomationId('loader').componentInstance;
    }

    get answerInput(): HTMLInputElement {
        return this.getByAutomationId('answer-input').nativeElement;
    }

    get actions(): DebugElement {
        return this.getByAutomationId('actions');
    }

    get actionsComponent(): MockedComponent<ActionsComponent> {
        return this.getByAutomationId('actions').componentInstance;
    }
}
