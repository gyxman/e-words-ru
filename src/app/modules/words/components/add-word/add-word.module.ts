import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddWordComponent} from './add-word.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControlErrorModule} from '../../../auth/components/form-control-error/form-control-error.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        FormControlErrorModule,
        MatIconModule,
    ],
    declarations: [AddWordComponent],
    exports: [AddWordComponent],
})
export class AddWordModule {}
