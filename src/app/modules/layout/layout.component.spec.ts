import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';
import {HeaderComponent} from './components/header/header.component';

describe('LayoutComponent - компонент авторизованной зоны', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutComponent, MockComponent(HeaderComponent)],
            imports: [RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });

    it('Компонент создался', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(component).toBeTruthy();
    });
});
