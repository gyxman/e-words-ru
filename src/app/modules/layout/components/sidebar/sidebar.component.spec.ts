import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SidebarFacadeService} from '../../services/sidebar-facade.service';
import {instance, mock, when} from 'ts-mockito';
import {BehaviorSubject} from 'rxjs';
import {SidebarMenuItem} from '../../models/sidebar-menu-item';
import {Component} from '@angular/core';
import {PageObject} from '../../../../testing/page-object';
import {LayoutRouteEnum} from '../../enums/layout-route.enum';

@Component({
    template:
        '<app-sidebar automation-id="sidebar" (sidebarOnClick)="onClick()"></app-sidebar>',
})
class TestComponent {
    onClick() {}
}

describe('SidebarComponent', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: PageObject<TestComponent>;
    let sidebarFacadeServiceMock: SidebarFacadeService;
    let allMenu$: BehaviorSubject<Array<SidebarMenuItem>>;

    beforeEach(() => {
        sidebarFacadeServiceMock = mock(SidebarFacadeService);
        allMenu$ = new BehaviorSubject([]);
    });

    beforeEach(() => {
        when(sidebarFacadeServiceMock.allMenu$).thenReturn(allMenu$);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, SidebarComponent],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: SidebarFacadeService,
                    useFactory: () => instance(sidebarFacadeServiceMock),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new PageObject(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // arrange
        allMenu$.next([
            {
                title: 'Добавить слово',
                key: 'addWord',
                navigateTo: LayoutRouteEnum.AddWord,
            },
        ]);

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если происходит клик по компоненту левого меню, то сайдбар закрывается', () => {
        // arrange
        jest.spyOn(testComponent, 'onClick');

        fixture.detectChanges();

        // act
        pageObject.getByAutomationId('sidebar').triggerEventHandler('click', null);

        // assert
        expect(testComponent.onClick).toHaveBeenCalledTimes(1);
    });
});
