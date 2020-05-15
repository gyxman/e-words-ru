import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderComponent} from './loader.component';
import {MockComponent} from 'ng-mocks';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Component} from '@angular/core';
import {LoaderComponentPo} from './loader.component.po';

@Component({
    template: `<app-loader [showLoader]="showLoader" [showOverlay]="showOverlay"
        ><div class="some-content">Some text</div></app-loader
    >`,
})
class TestComponent {
    showLoader: boolean;
    showOverlay: boolean;
}

describe('LoaderComponent - компонент отображения лоадера', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: LoaderComponentPo<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                LoaderComponent,
                MockComponent(MatProgressSpinner),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new LoaderComponentPo(fixture);
    });

    it('Если компонент загрузился, то все элементы отрисовались', () => {
        // arrange
        testComponent.showLoader = true;
        testComponent.showOverlay = true;

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если лоадер не показывается, то его нет на странице', () => {
        // arrange
        testComponent.showLoader = false;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader).toBeNull();
    });

    it('Если лоадер не показывается, то спиннера нет на странице', () => {
        // arrange
        testComponent.showLoader = false;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.spinner).toBeNull();
    });

    it('Если оверлей не показывается, то его нет на странице', () => {
        // arrange
        testComponent.showLoader = true;
        testComponent.showOverlay = false;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.overlay).toBeNull();
    });

    it('Если оверлей не показывается, то у контента нет класса для оверлея', () => {
        // arrange
        testComponent.showLoader = true;
        testComponent.showOverlay = false;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.content.classes).toEqual({'content_with-overlay': false});
    });

    it('Если лоадер показывается, то он есть на странице', () => {
        // arrange
        testComponent.showLoader = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader).toBeTruthy();
    });

    it('Если лоадер показывается, то спиннер есть на странице', () => {
        // arrange
        testComponent.showLoader = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.spinner).toBeTruthy();
    });

    it('Если лоадер показывается, то у спиннера есть атрибут mode и он равен indeterminate', () => {
        // arrange
        testComponent.showLoader = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.spinner.attributes['mode']).toBe('indeterminate');
    });

    it('Если оверлей показывается, то он есть на странице', () => {
        // arrange
        testComponent.showLoader = true;
        testComponent.showOverlay = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.overlay).toBeTruthy();
    });

    it('Если оверлей показывается, то у контента есть класс для оверлея', () => {
        // arrange
        testComponent.showLoader = true;
        testComponent.showOverlay = true;

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.content.classes).toEqual({'content_with-overlay': true});
    });
});
