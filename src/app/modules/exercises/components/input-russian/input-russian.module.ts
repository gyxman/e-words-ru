import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputRussianComponent} from './input-russian.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlErrorModule} from '../../../auth/components/form-control-error/form-control-error.module';
import {MapperModule} from '../../../utils/pipes/mapper/mapper.module';
import {ActionsModule} from '../actions/actions.module';
import {LoaderModule} from '../../../utils/components/loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        MapperModule,
        MatInputModule,
        ReactiveFormsModule,
        FormControlErrorModule,
        ActionsModule,
        LoaderModule,
    ],
    declarations: [InputRussianComponent],
    exports: [InputRussianComponent],
})
export class InputRussianModule {}
