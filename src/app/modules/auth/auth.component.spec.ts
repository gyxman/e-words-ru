import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthComponent} from './auth.component';

describe('AuthComponent - компонент авторизационной группы', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AuthComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
    });

    it('Компонент создался', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(component).toBeTruthy();
    });
});
