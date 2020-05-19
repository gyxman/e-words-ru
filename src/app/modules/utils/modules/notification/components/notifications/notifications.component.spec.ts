import {
    async,
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';

import {NotificationsComponent} from './notifications.component';
import {NotificationService} from '../../services/notification.service';
import {instance, mock, when} from 'ts-mockito';
import {Subject} from 'rxjs';
import {NotificationModel} from '../../models/notification';
import {MockModule} from 'ng-mocks';
import {NotificationModule} from '../notification/notification.module';
import {NotificationComponent} from '../notification/notification.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

describe('NotificationsComponent - компонент для показа нотификаций', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let notificationServiceMock: NotificationService;
    let notificationStream$: Subject<NotificationModel>;

    beforeEach(() => {
        notificationStream$ = new Subject();

        notificationServiceMock = mock(NotificationService);
    });

    beforeEach(() => {
        when(notificationServiceMock.notificationsStream$).thenReturn(
            notificationStream$,
        );
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            imports: [NotificationModule, NoopAnimationsModule, HttpClientModule],
            providers: [
                {
                    provide: NotificationService,
                    useFactory: () => instance(notificationServiceMock),
                },
            ],
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {entryComponents: [NotificationComponent]},
            })
            .overrideModule(NotificationModule, {
                remove: {imports: [MatIconModule]},
                add: {imports: [MockModule(MatIconModule)]},
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
    });

    it('Если пришла информация о показе нотификации успеха, то она отрисовалась корректно', fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
            time: 100,
        });

        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();

        tick(100);
        discardPeriodicTasks();
    }));

    it('Если пришла информация о показе нотификации уведомления, то она отрисовалась корректно', fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Внимание',
            type: 'warning',
            time: 100,
        });

        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();

        tick(100);
        discardPeriodicTasks();
    }));

    it('Если пришла информация о показе нотификации ошибки, то она отрисовалась корректно', fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Ошибка',
            type: 'error',
            time: 100,
        });

        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();

        tick(100);
        discardPeriodicTasks();
    }));

    it('Если пришла информация о показе нотификации, то рисуем нотификацию', fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
            time: 100,
        });

        // assert
        expect(fixture.debugElement.query(By.css('app-notification'))).toBeTruthy();

        tick(100);
        discardPeriodicTasks();
    }));

    it(`Если пришла информация о показе нотификации, то сохраняем информацию о ней в объекте`, fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
            time: 100,
        });

        // assert
        expect(Object.keys(component.components).length).toBe(1);

        tick(100);
        discardPeriodicTasks();
    }));

    it(`Если пришла информация о показе нотификации и в информации передано время,
        то через указанное время нотификация удалится`, fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
            time: 100,
        });

        tick(100);

        // assert
        expect(fixture.debugElement.query(By.css('app-notification'))).toBeNull();

        discardPeriodicTasks();
    }));

    it(`Если пришла информация о показе нотификации и в информации не передано время,
        то через 3 секунды нотификация удалится`, fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
        });

        tick(3000);

        // assert
        expect(fixture.debugElement.query(By.css('app-notification'))).toBeNull();

        discardPeriodicTasks();
    }));

    it(`Если пришла информация о показе нотификации и в информации не передано время,
        то через 3 секунды почистится объект с информацией о нотификациях`, fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
        });

        tick(3000);

        // assert
        expect(Object.keys(component.components).length).toBe(0);

        discardPeriodicTasks();
    }));

    it(`Если пришла информация о показе нотификации,
        а через секунду пришла новая информация о показе нотификации,
        то на странице будет одновременно находиться 2 нотификации`, fakeAsync(() => {
        // arrange
        fixture.detectChanges();

        // act
        notificationStream$.next({
            text: 'Уведомление',
            type: 'success',
        });

        tick(1000);

        notificationStream$.next({
            text: 'Уведомление 2',
            type: 'warning',
        });

        // assert
        expect(fixture.debugElement.queryAll(By.css('app-notification')).length).toBe(2);

        tick(3000);
        discardPeriodicTasks();
    }));
});
