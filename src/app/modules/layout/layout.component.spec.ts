import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponentPo} from './layout.component.po';
import {LayoutFacadeService} from './services/layout-facade.service';
import {instance, mock, when} from 'ts-mockito';
import {BehaviorSubject} from 'rxjs';
import {LoaderModule} from '../utils/components/loader/loader.module';

describe('LayoutComponent - компонент авторизованной зоны', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let pageObject: LayoutComponentPo<LayoutComponent>;
    let layoutFacadeServiceMock: LayoutFacadeService;
    let showLoaderMock$: BehaviorSubject<boolean>;

    beforeEach(() => {
        layoutFacadeServiceMock = mock(LayoutFacadeService);

        showLoaderMock$ = new BehaviorSubject(false);
    });

    beforeEach(() => {
        when(layoutFacadeServiceMock.showLoader$).thenReturn(showLoaderMock$);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutComponent,
                MockComponent(HeaderComponent),
                MockComponent(SidebarComponent),
            ],
            imports: [
                RouterTestingModule,
                MatSidenavModule,
                NoopAnimationsModule,
                LoaderModule,
            ],
            providers: [
                {
                    provide: LayoutFacadeService,
                    useFactory: () => instance(layoutFacadeServiceMock),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        pageObject = new LayoutComponentPo(fixture);
    });

    describe('Проверка общей верстки компонента', () => {
        it('Если компонент загрузился, то все элементы отрисовались', () => {
            // act
            fixture.detectChanges();

            // assert
            expect(fixture.nativeElement).toMatchSnapshot();
        });
    });

    describe('Отображение лоадера', () => {
        it('Если информация о показе лоадера не пришла, то не отображаем его на странице', () => {
            // arrange
            showLoaderMock$.next(false);

            // act
            fixture.detectChanges();

            // assert
            expect(pageObject.loader.showLoader).toBe(false);
        });

        it('Если информация о показе лоадера пришла, то отображаем его на странице', () => {
            // arrange
            showLoaderMock$.next(true);

            // act
            fixture.detectChanges();

            // assert
            expect(pageObject.loader.showLoader).toBe(true);
        });

        it('Если информация о показе лоадера пришла, то у лоадера есть оверлей', () => {
            // arrange
            showLoaderMock$.next(true);

            // act
            fixture.detectChanges();

            // assert
            expect(pageObject.loader.showOverlay).toBe(true);
        });
    });

    describe('Левая панель', () => {
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

        it(`Если пользователь открывает левую панель, а потом нажимает на подложку в основной части приложения,
        то левая панель закрывается`, () => {
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
});
