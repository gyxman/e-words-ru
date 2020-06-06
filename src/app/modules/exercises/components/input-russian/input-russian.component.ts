import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {Word} from '../../../words/models/word';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-input-russian',
    templateUrl: './input-russian.component.html',
    styleUrls: ['./input-russian.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRussianComponent {
    @Input() word$: Observable<Word>;
    @Input() showLoader$: Observable<boolean>;

    @Output() answer = new EventEmitter<string>();

    answerControl = new FormControl(null, [Validators.required]);

    getCurrentWord({englishWord}: Word): string {
        return englishWord;
    }

    onSubmit() {
        this.answer.emit(this.answerControl.value.trim());
        this.answerControl.patchValue(null);
    }
}
