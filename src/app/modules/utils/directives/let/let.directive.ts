import {Directive, Inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {LetContext} from './letContext';

@Directive({
    selector: '[appLet]',
})
export class LetDirective<T> {
    @Input()
    appLet: T;

    constructor(
        @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
        @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>,
    ) {
        viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
    }
}
