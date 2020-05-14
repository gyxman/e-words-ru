import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MockModule} from 'ng-mocks';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponentPo} from './header.component.po';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent - компонент верхней части авторизованной зоны', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let pageObject: HeaderComponentPo<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatIconModule),
                RouterTestingModule,
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

    it('Если пользователь нажимает на логотип, то выполняется переход на главную страницу', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.logo.properties.href).toBe('/');
    });
});
