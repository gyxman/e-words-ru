import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class ManageWordFormService {
    readonly form = new FormGroup({
        englishWord: new FormControl(null, [Validators.required]),
        russianWord: new FormControl(null, [Validators.required]),
        synonyms: new FormArray([]),
    });

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

    removeSynonym(index: number) {
        this.synonymsControl.removeAt(index);
    }
}
