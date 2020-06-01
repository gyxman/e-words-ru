import {PageObject} from '../../testing/page-object';
import {DebugElement} from '@angular/core';
import {LoaderComponent} from '../utils/components/loader/loader.component';

export class LayoutComponentPo<T> extends PageObject<T> {
    get loader(): LoaderComponent {
        return this.getByAutomationId('loader').componentInstance;
    }

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
