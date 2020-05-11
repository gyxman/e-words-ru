import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {MockModule} from 'ng-mocks';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControlErrorModule} from '../form-control-error/form-control-error.module';

describe('LoginComponent - компонент входа в приложение', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                MockModule(ReactiveFormsModule),
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(FormControlErrorModule),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });
});
