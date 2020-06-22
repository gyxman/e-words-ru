import {PageObject} from '../../../../testing/page-object';

export class WordsListComponentPo<T> extends PageObject<T> {
    get filterInput(): HTMLInputElement {
        return this.getByAutomationId('filter-input').nativeElement;
    }
}
