import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LayoutComponent - компонент авторизованной зоны', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutComponent,
                MockComponent(HeaderComponent),
                MockComponent(SidebarComponent),
            ],
            imports: [RouterTestingModule, MatSidenavModule, NoopAnimationsModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });

    it('Компонент создался', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(component).toBeTruthy();
    });
});
