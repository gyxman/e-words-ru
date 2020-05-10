import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

/* istanbul ignore next */
export class PageObject<T> {
    constructor(protected fixture: ComponentFixture<T>) {}

    get debugElement(): DebugElement {
        return this.fixture.debugElement;
    }

    getByAutomationId(id: string, element?: DebugElement): DebugElement {
        const debugElement = element || this.debugElement;

        return debugElement.query(By.css(`[automation-id=${id}]`));
    }

    click(selector: string | DebugElement, event?: Event) {
        const element = this.resolveSelector(selector);

        element.triggerEventHandler('click', event || this.getDefaultEvent('click'));
        this.fixture.detectChanges();
    }

    text(selector: string | DebugElement): string {
        const element = this.resolveSelector(selector);

        return element.nativeElement.textContent.trim();
    }

    private resolveSelector(selector: string | DebugElement): DebugElement {
        return typeof selector === 'string'
            ? this.getByAutomationId(selector as string)
            : (selector as DebugElement);
    }

    private getDefaultEvent(name: string): MouseEvent | null {
        switch (name) {
            case 'click':
                return new MouseEvent('click');
            default:
                return null;
        }
    }
}
