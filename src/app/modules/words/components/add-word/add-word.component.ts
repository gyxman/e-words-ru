import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ManageWordFormService} from '../../services/manage-word-form.service';
import {WordsFacadeService} from '../../services/words-facade.service';

@Component({
    selector: 'app-add-word',
    templateUrl: './add-word.component.html',
    styleUrls: ['./add-word.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWordComponent {
    showLoader$ = this.wordsFacadeService.showLoader$;

    form = this.formService.form;
    englishWordControl = this.formService.englishWordControl;
    russianWordControl = this.formService.russianWordControl;
    synonymsControl = this.formService.synonymsControl;

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private formService: ManageWordFormService,
        private wordsFacadeService: WordsFacadeService,
    ) {
        iconRegistry.addSvgIcon(
            'delete',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icon-delete.svg'),
        );
    }

    addSynonym() {
        this.formService.addSynonym();
    }

    removeSynonym(index: number) {
        this.formService.removeSynonym(index);
    }

    onSubmit() {
        this.wordsFacadeService.addWord(this.form.value);
    }
}
