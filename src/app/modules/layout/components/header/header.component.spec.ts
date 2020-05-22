import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {MockDirective, MockModule} from 'ng-mocks';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponentPo} from './header.component.po';
import {AuthFacadeService} from '../../../auth/services/auth-facade.service';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {Router, RouterLink} from '@angular/router';
import {AuthRouteEnum} from '../../../auth/enums/auth-route.enum';

describe('HeaderComponent - компонент верхней части авторизованной зоны', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let pageObject: HeaderComponentPo<HeaderComponent>;
    let authFacadeServiceMock: AuthFacadeService;
    let routerMock: Router;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);
        routerMock = mock(Router);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, MockDirective(RouterLink)],
            imports: [MockModule(MatButtonModule), MockModule(MatIconModule)],
            providers: [
                {
                    provide: AuthFacadeService,
                    useFactory: () => instance(authFacadeServiceMock),
                },
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        pageObject = new HeaderComponentPo(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь нажимает на кнопку выхода из приложения, вызывается метод выхода', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.click(pageObject.exit);

        // assert
        verify(authFacadeServiceMock.signOut()).once();
    });

    it('Если пользователь нажимает на кнопку выхода из приложения, перебрасываем пользователя на страницу логина', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.click(pageObject.exit);

        // assert
        verify(routerMock.navigate(deepEqual([AuthRouteEnum.Login]))).once();
    });
});
