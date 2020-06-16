import {PageObject} from '../../testing/page-object';
import {MockedComponent} from 'ng-mocks';
import {LoaderComponent} from '../utils/components/loader/loader.component';

export class ExercisesComponentPo<T> extends PageObject<T> {
    get loader(): MockedComponent<LoaderComponent> {
        return this.getByAutomationId('loader').componentInstance;
    }
}
