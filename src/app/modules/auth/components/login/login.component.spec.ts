import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {MockModule} from 'ng-mocks';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControlErrorModule} from '../form-control-error/form-control-error.module';
import {AuthFacadeService} from '../../services/auth-facade.service';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {LoginComponentPo} from './login.component.po';

describe('LoginComponent - компонент входа в приложение', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let pageObject: LoginComponentPo<LoginComponent>;
    let authFacadeServiceMock: AuthFacadeService;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                MockModule(ReactiveFormsModule),
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(FormControlErrorModule),
            ],
            providers: [
                {
                    provide: AuthFacadeService,
                    useFactory: () => instance(authFacadeServiceMock),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        pageObject = new LoginComponentPo(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь нажимает на кнопку логин, то отправляем запрос на авторизацию', () => {
        // act
        fixture.detectChanges();

        pageObject.click(pageObject.submitButton);
        pageObject.form.triggerEventHandler('ngSubmit', null);

        // assert
        verify(
            authFacadeServiceMock.signInWithEmail(
                deepEqual({
                    email: null,
                    password: null,
                }),
            ),
        ).once();
    });
});
