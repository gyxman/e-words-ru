import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MockComponent} from 'ng-mocks';
import {NotificationsComponent} from './modules/utils/modules/notification/components/notifications/notifications.component';

describe('AppComponent - корневой компонент', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, MockComponent(NotificationsComponent)],
            imports: [RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('Компонент создался', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(component).toBeTruthy();
    });
});
