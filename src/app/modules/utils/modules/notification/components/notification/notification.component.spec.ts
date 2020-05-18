import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NotificationComponent} from './notification.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockModule} from 'ng-mocks';
import {MatIconModule} from '@angular/material/icon';
import {Component, ViewChild} from '@angular/core';
import {NotificationComponentPo} from './notification.component.po';

@Component({
    template: '<app-notification [info]="info"></app-notification>',
})
class TestComponent {
    @ViewChild(NotificationComponent) component: NotificationComponent;

    info = {};
}

describe('NotificationComponent - компонент нотификации', () => {
    let testComponent: TestComponent;
    let pageObject: NotificationComponentPo<TestComponent>;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, NotificationComponent],
            imports: [NoopAnimationsModule, MockModule(MatIconModule)],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new NotificationComponentPo(fixture);
    });

    it('Если пользователь показывает нотификацию успеха, то верстка корректна', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация успеха',
            type: 'success',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь показывает нотификацию успеха, то рисуем иконку успеха', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация успеха',
            type: 'success',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.icon.attributes['ng-reflect-svg-icon']).toBe('success');
    });

    it('Если пользователь показывает нотификацию уведомления, то верстка корректна', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация уведомления',
            type: 'warning',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь показывает нотификацию уведомления, то рисуем иконку уведомления', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация уведомления',
            type: 'warning',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.icon.attributes['ng-reflect-svg-icon']).toBe('warning');
    });

    it('Если пользователь показывает нотификацию ошибки, то верстка корректна', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация ошибки',
            type: 'error',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь показывает нотификацию ошибки, то рисуем иконку ошибки', () => {
        // arrange
        testComponent.info = {
            text: 'Нотификация ошибки',
            type: 'error',
        };

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.icon.attributes['ng-reflect-svg-icon']).toBe('error');
    });
});
