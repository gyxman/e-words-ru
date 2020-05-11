import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControlErrorComponent} from './form-control-error.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [CommonModule, MatFormFieldModule],
    declarations: [FormControlErrorComponent],
    exports: [FormControlErrorComponent],
})
export class FormControlErrorModule {}
