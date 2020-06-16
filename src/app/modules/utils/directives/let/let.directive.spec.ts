import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LetModule} from './let.module';
import {PageObject} from '../../../../testing/page-object';

describe('Let - директива для создания локальных переменных в шаблоне', () => {
    @Component({
        template: ` <div *appLet="getter as value" automation-id="test">
            {{ value }}{{ value }}{{ value }}
        </div>`,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        counter = 0;

        get getter(): string {
            this.counter++;

            return '!';
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: PageObject<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [LetModule],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new PageObject(fixture);
    });

    it('Если компонент создался, то результат отрисовки локальной переменной применился 3 раза', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.text(pageObject.getByAutomationId('test'))).toBe('!!!');
    });

    it('Если компонент создался, то вычисление локальной переменной происходит 1 раз', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(testComponent.counter).toBe(1);
    });
});
