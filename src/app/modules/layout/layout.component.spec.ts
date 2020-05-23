import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponentPo} from './layout.component.po';

describe('LayoutComponent - компонент авторизованной зоны', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let pageObject: LayoutComponentPo<LayoutComponent>;

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
        pageObject = new LayoutComponentPo(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если компонент загрузился, то левая панель скрыта', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.sidebarContent).toBeNull();
    });

    it('Если из header пришло событие открытия сайдбара, то левая панель открывается', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.header.triggerEventHandler('openSidebar', null);

        fixture.detectChanges();

        // assert
        expect(pageObject.sidebarContent).toBeTruthy();
    });

    it('Если пользователь открывает левую панель, а потом нажимает esc, то левая панель закрывается', () => {
        // arrange
        fixture.detectChanges();

        pageObject.header.triggerEventHandler('openSidebar', null);

        fixture.detectChanges();

        // act
        pageObject.sidebar.triggerEventHandler('keydown.escape', null);

        fixture.detectChanges();

        // assert
        expect(pageObject.sidebarContent).toBeNull();
    });

    it('Если пользователь открывает левую панель, а потом нажимает на подложку в основной части приложения, то левая панель закрывается', () => {
        // arrange
        fixture.detectChanges();

        pageObject.header.triggerEventHandler('openSidebar', null);

        fixture.detectChanges();

        // act
        pageObject.layout.triggerEventHandler('backdropClick', null);

        fixture.detectChanges();

        // assert
        expect(pageObject.sidebarContent).toBeNull();
    });
});
