import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-form-control-error',
    templateUrl: './form-control-error.component.html',
    styleUrls: ['./form-control-error.component.less'],
    // https://github.com/angular/angular/issues/10887
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlErrorComponent {
    @Input() control: FormControl;
}
