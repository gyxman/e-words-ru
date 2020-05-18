import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-add-word',
    templateUrl: './add-word.component.html',
    styleUrls: ['./add-word.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWordComponent {
    form = new FormGroup({
        englishWord: new FormControl(null, [Validators.required]),
        russianWord: new FormControl(null, [Validators.required]),
        synonyms: new FormArray([]),
    });

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'delete',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-delete.svg'),
        );
    }

    get englishWordControl(): FormControl {
        return this.form.get('englishWord') as FormControl;
    }

    get russianWordControl(): FormControl {
        return this.form.get('russianWord') as FormControl;
    }

    get synonymsControl(): FormArray {
        return this.form.get('synonyms') as FormArray;
    }

    addSynonym() {
        const control = new FormControl(null, [Validators.required]);

        this.synonymsControl.push(control);
    }

    onSubmit() {
        console.log(this.synonymsControl.value);
    }
}
