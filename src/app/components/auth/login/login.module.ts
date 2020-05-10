import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {FormControlErrorModule} from '../form-control-error/form-control-error.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        FormControlErrorModule,
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
})
export class LoginModule {}
