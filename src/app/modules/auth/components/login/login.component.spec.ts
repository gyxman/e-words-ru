import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {MockComponent, MockModule} from 'ng-mocks';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControlErrorModule} from '../form-control-error/form-control-error.module';
import {AuthFacadeService} from '../../services/auth-facade.service';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {LoginComponentPo} from './login.component.po';
import {BehaviorSubject, of} from 'rxjs';
import {LoaderComponent} from '../../../utils/components/loader/loader.component';

describe('LoginComponent - компонент входа в приложение', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let pageObject: LoginComponentPo<LoginComponent>;
    let authFacadeServiceMock: AuthFacadeService;
    let showLoader$: BehaviorSubject<boolean>;

    beforeEach(() => {
        authFacadeServiceMock = mock(AuthFacadeService);

        showLoader$ = new BehaviorSubject(false);
    });

    beforeEach(() => {
        when(authFacadeServiceMock.showLoader$).thenReturn(showLoader$);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent, MockComponent(LoaderComponent)],
            imports: [
                ReactiveFormsModule,
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

    it('Если пришла информация о показе лоадера, то он отображается', () => {
        // arrange
        showLoader$.next(true);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader.showLoader).toBe(true);
    });

    it('Если информация о показе лоадера не пришла, то он не отображается', () => {
        // arrange
        showLoader$.next(false);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader.showLoader).toBe(false);
    });

    it('Если пользователь открывает страниицу логина, то кнопка "Войти" недоступна', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it('Если пользователь открывает страниицу логина, заполняет e-mail валидным значением, кнопка "Войти" недоступна', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.emailInput.value = 'test@test.ru';
        pageObject.emailInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it('Если пользователь открывает страниицу логина, заполняет пароль валидным значением, кнопка "Войти" недоступна', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.passwordInput.value = 'testPassword';
        pageObject.passwordInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it(`Если пользователь открывает страниицу логина, заполняет e-mail невалидным значением,
        а пароль валидным значением, кнопка "Войти" недоступна`, () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.emailInput.value = 'test';
        pageObject.emailInput.dispatchEvent(new Event('input'));

        pageObject.passwordInput.value = 'testPassword';
        pageObject.passwordInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it(`Если пользователь открывает страниицу логина, заполняет e-mail валидным значением,
        а пароль невалидным значением, кнопка "Войти" недоступна`, () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.emailInput.value = 'test@test.ru';
        pageObject.emailInput.dispatchEvent(new Event('input'));

        pageObject.passwordInput.value = 'test';
        pageObject.passwordInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it('Если пользователь открывает страниицу логина, заполняет e-mail и пароль валидными значениями, кнопка "Войти" доступна', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.emailInput.value = 'test@test.ru';
        pageObject.emailInput.dispatchEvent(new Event('input'));

        pageObject.passwordInput.value = 'testPassword';
        pageObject.passwordInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('false');
    });

    it('Если пользователь отправляет форму, то отправляем запрос на авторизацию данными, которые ввел пользователь', () => {
        // act
        fixture.detectChanges();

        pageObject.emailInput.value = 'test@test.ru';
        pageObject.emailInput.dispatchEvent(new Event('input'));

        pageObject.passwordInput.value = 'testPassword';
        pageObject.passwordInput.dispatchEvent(new Event('input'));

        pageObject.form.triggerEventHandler('ngSubmit', null);

        // assert
        verify(
            authFacadeServiceMock.signInWithEmail(
                deepEqual({
                    email: 'test@test.ru',
                    password: 'testPassword',
                }),
            ),
        ).once();
    });
});
