import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
    @Input() disabledSubmit = false;

    @Output() submit = new EventEmitter();

    onSubmit() {
        this.submit.emit();
    }
}
