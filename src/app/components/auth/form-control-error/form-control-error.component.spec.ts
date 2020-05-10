import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormControlErrorComponent} from './form-control-error.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormControlErrorComponentPo} from './form-control-error.component.po';
import {MockModule} from 'ng-mocks';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: '',
    template: '<app-form-control-error [control]="control"></app-form-control-error>',
})
class TestComponent {
    control = new FormControl(null);
}

describe('FormControlErrorComponent - компонент отображения ошибок', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: FormControlErrorComponentPo<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormControlErrorComponent, TestComponent],
            imports: [MockModule(MatFormFieldModule)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new FormControlErrorComponentPo(fixture);
    });

    it('Если пришел control с ошибкой об обязательности поля, отображаем эту ошибку', () => {
        // arrange
        testComponent.control.markAsTouched();
        testComponent.control.setErrors({required: true});

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.errorRequired.nativeElement.textContent).toContain(
            'Поле обязательно для заполнения',
        );
    });

    it('Если пришел control с ошибкой о невалидном e-mail, отображаем эту ошибку', () => {
        // arrange
        testComponent.control.markAsTouched();
        testComponent.control.setErrors({email: true});

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.errorEmail.nativeElement.textContent).toContain(
            'Неверный формат E-mail',
        );
    });

    it('Если пришел control с ошибкой о минимальной длине пароля, отображаем эту ошибку', () => {
        // arrange
        testComponent.control.markAsTouched();
        testComponent.control.setErrors({
            minlength: {requiredLength: 8, actualLength: 5},
        });

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.errorMinlength.nativeElement.textContent).toContain(
            `Пароль должен быть не менее 8 символов. Сейчас 5 символов`,
        );
    });
});
