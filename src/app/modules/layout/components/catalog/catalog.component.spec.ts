import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CatalogComponent} from './catalog.component';
import {PageObject} from '../../../../testing/page-object';
import {Router} from '@angular/router';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {CatalogItemManagerPlugin} from '../../interfaces/catalog-item-manager-plugin';
import {ComponentEnum} from '../../../exercises/enums/component.enum';
import {CATALOG_ITEM_MANAGER_PLUGIN} from '../../tokens/catalog-item-manager-plugin.token';

describe('CatalogComponent - каталог упражнений', () => {
    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;
    let pageObject: PageObject<CatalogComponent>;
    let routerMock: Router;
    let inputRussianMock: CatalogItemManagerPlugin;

    beforeEach(() => {
        routerMock = mock(Router);
        inputRussianMock = mock<CatalogItemManagerPlugin>();
    });

    beforeEach(() => {
        when(inputRussianMock.getItem()).thenReturn({
            name: 'С английского на русский',
            component: ComponentEnum.InputRussian,
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CatalogComponent],
            providers: [
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
                {
                    provide: CATALOG_ITEM_MANAGER_PLUGIN,
                    useFactory: () => instance(inputRussianMock),
                    multi: true,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        pageObject = new PageObject(fixture);
    });

    it('Если компонент загрузился, то все элементы корректно отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь нажимает на упражнение, выполняем переход к упражнению', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.click(pageObject.getByAutomationId('item-0'));

        // assert
        verify(
            routerMock.navigate(
                deepEqual(['user', 'start']),
                deepEqual({queryParams: {component: 'input-russian'}}),
            ),
        ).once();
    });
});
