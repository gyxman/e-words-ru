import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationsComponent} from './notifications.component';
import {NotificationService} from '../../services/notification.service';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            providers: [NotificationService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
