import {
    async,
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import {TimerComponent} from './timer.component';
import {Component} from '@angular/core';
import {TimerComponentPo} from './timer.component.po';
import {MockModule} from 'ng-mocks';
import {MatIconModule} from '@angular/material/icon';

@Component({
    template: '<app-timer [seconds]="seconds" [callback]="callback"></app-timer>',
})
class TestComponent {
    seconds: number;
    callback = () => {};
}

describe('TimerComponent - компонент таймера обратного отсчета', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: TimerComponentPo<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TimerComponent],
            imports: [MockModule(MatIconModule)],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new TimerComponentPo(fixture);
    });

    it('Если таймер загрузился, то все элементы отрисовались', fakeAsync(() => {
        // arrange
        testComponent.seconds = 1000;

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();

        tick(1000000);
        discardPeriodicTasks();
    }));

    it('Если пришло время для таймера, то таймер начинает работать и уменьшает полученное значение каждую секунду', fakeAsync(() => {
        // arrange
        testComponent.seconds = 10;

        fixture.detectChanges();

        // act
        tick(1000);

        fixture.detectChanges();

        // assert
        expect(pageObject.text(pageObject.time)).toBe('00:09');

        tick(10000);
        discardPeriodicTasks();
    }));

    it('Если пришло время для таймера, и оно больше 10 секунд, то специальный класс для выделения не ставится', fakeAsync(() => {
        // arrange
        testComponent.seconds = 12;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.time.classes).toEqual({time_attention: false});

        tick(12000);
        discardPeriodicTasks();
    }));

    it('Если пришло время для таймера, и остается меньше 10 секунд, то устанавливается специальный класс для выделения', fakeAsync(() => {
        // arrange
        testComponent.seconds = 12;

        fixture.detectChanges();

        // act
        tick(3000);

        fixture.detectChanges();

        // assert
        expect(pageObject.time.classes).toEqual({time_attention: true});

        tick(9000);
        discardPeriodicTasks();
    }));

    it('Если время, отведенное для работы таймера закончилось, то таймер останавливается на значении 00:00', fakeAsync(() => {
        // arrange
        testComponent.seconds = 1;
        testComponent.callback = () => {};

        fixture.detectChanges();

        // act
        tick(3000);

        fixture.detectChanges();

        // assert
        expect(pageObject.text(pageObject.time)).toBe('00:00');

        discardPeriodicTasks();
    }));

    it('Если время, отведенное для работы таймера закончилось, то вызывается переданная в таймер функция', fakeAsync(() => {
        // arrange
        testComponent.seconds = 1;

        jest.spyOn(testComponent, 'callback');

        fixture.detectChanges();

        // act
        tick(3000);

        fixture.detectChanges();

        // assert
        expect(testComponent.callback).toHaveBeenCalledTimes(1);

        discardPeriodicTasks();
    }));
});
