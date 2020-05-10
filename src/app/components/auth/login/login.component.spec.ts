import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';

describe('LoginComponent - компонент входа в приложение', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });
});
