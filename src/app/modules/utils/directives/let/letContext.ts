import {Context} from './context';
import {LetDirective} from './let.directive';

export class LetContext<T> implements Context<T> {
    constructor(private readonly internalDirectiveInstance: LetDirective<T>) {}

    get $implicit(): T {
        return this.internalDirectiveInstance.appLet;
    }

    get appLet(): T {
        return this.internalDirectiveInstance.appLet;
    }
}
