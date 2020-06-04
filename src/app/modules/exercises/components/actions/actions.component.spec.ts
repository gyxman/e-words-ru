import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActionsComponent} from './actions.component';
import {MatButtonModule} from '@angular/material/button';
import {Component} from '@angular/core';
import {ActionsComponentPo} from './actions.component.po';

@Component({
    template:
        '<app-actions [disabledSubmit]="disabled" (submit)="submit()"></app-actions>',
})
class TestComponent {
    disabled = false;

    submit() {}
}

describe('ActionsComponent - компонент с кнопками для упражнений', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: ActionsComponentPo<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, ActionsComponent],
            imports: [MatButtonModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new ActionsComponentPo(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пришла информация о блокировке кнопки, то блокируем кнопку отправить', () => {
        // arrange
        testComponent.disabled = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes.disabled).toBe('true');
    });

    it('Если информация о блокировке кнопки не пришла, то не блокируем кнопку отправить', () => {
        // arrange
        testComponent.disabled = false;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes.disabled).toBeNull();
    });

    it('Если пользователь нажимает на кнопку, то эммитим экшен', () => {
        // arrange
        jest.spyOn(testComponent, 'submit');

        fixture.detectChanges();

        // act
        pageObject.click(pageObject.submitButton);

        // assert
        expect(testComponent.submit).toHaveBeenCalledTimes(1);
    });
});
