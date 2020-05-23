import {PageObject} from '../../testing/page-object';
import {DebugElement} from '@angular/core';

export class LayoutComponentPo<T> extends PageObject<T> {
    get layout(): DebugElement {
        return this.getByAutomationId('layout');
    }

    get sidebar(): DebugElement {
        return this.getByAutomationId('sidebar');
    }

    get sidebarContent(): DebugElement {
        return this.getByAutomationId('sidebar-content');
    }

    get header(): DebugElement {
        return this.getByAutomationId('header');
    }
}
