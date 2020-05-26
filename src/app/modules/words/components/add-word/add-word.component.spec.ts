import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddWordComponent} from './add-word.component';
import {AddWordComponentPo} from './add-word.component.po';
import {ReactiveFormsModule} from '@angular/forms';
import {MockComponent, MockModule} from 'ng-mocks';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControlErrorModule} from '../../../auth/components/form-control-error/form-control-error.module';
import {MatIconModule} from '@angular/material/icon';
import {ManageWordFormService} from '../../services/manage-word-form.service';
import {WordsFacadeService} from '../../services/words-facade.service';
import {instance, mock, when} from 'ts-mockito';
import {BehaviorSubject} from 'rxjs';
import {LoaderComponent} from '../../../utils/components/loader/loader.component';

describe('AddWordComponent - форма добавления нового слова', () => {
    let component: AddWordComponent;
    let fixture: ComponentFixture<AddWordComponent>;
    let pageObject: AddWordComponentPo<AddWordComponent>;
    let wordsFacadeServiceMock: WordsFacadeService;
    let showLoader$: BehaviorSubject<boolean>;

    beforeEach(() => {
        wordsFacadeServiceMock = mock(WordsFacadeService);

        showLoader$ = new BehaviorSubject(false);
    });

    beforeEach(() => {
        when(wordsFacadeServiceMock.showLoader$).thenReturn(showLoader$);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddWordComponent, MockComponent(LoaderComponent)],
            imports: [
                ReactiveFormsModule,
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(FormControlErrorModule),
                MockModule(MatIconModule),
            ],
            providers: [
                ManageWordFormService,
                {
                    provide: WordsFacadeService,
                    useFactory: () => instance(wordsFacadeServiceMock),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWordComponent);
        component = fixture.componentInstance;
        pageObject = new AddWordComponentPo(fixture);
    });

    it('Если информация по лоадеру не пришла, он не отображается', () => {
        // arrange
        showLoader$.next(false);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader.showLoader).toBe(false);
    });

    it('Если информация по лоадеру пришла, он отображается', () => {
        // arrange
        showLoader$.next(true);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loader.showLoader).toBe(true);
    });

    it('Если пользователь открывает форму добавления слова, то кнопка "Добавить слово" недоступна', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it('Если пользователь открывает форму добавления слова, заполняет английское слово, кнопка "Добавить слово" недоступна', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.englishWord.value = 'englishWord';
        pageObject.englishWord.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it(`Если пользователь открывает форму добавления слова, заполняет английское слово,
        заполняет русское слово, кнопка "Добавить слово" доступна`, () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.englishWord.value = 'englishWord';
        pageObject.englishWord.dispatchEvent(new Event('input'));

        pageObject.russianWord.value = 'englishWord';
        pageObject.russianWord.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('false');
    });

    it('Если пользователь нажимает на кнопку "Добавить синоним", в форме появляется дополнительное поле', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.click(pageObject.addSynonymButton);

        // assert
        expect(pageObject.getByAutomationId('synonym-0')).toBeTruthy();
    });

    it('Если пользователь нажимает на кнопку "Добавить синоним", а потом нажимает на иконку корзины, то дополнительное поле удаляется из формы', () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.click(pageObject.addSynonymButton);

        fixture.detectChanges();

        pageObject.click(pageObject.getByAutomationId('delete-synonym-0'));

        // assert
        expect(pageObject.getByAutomationId('synonym-0')).toBeNull();
    });

    it(`Если пользователь открывает форму добавления слова, заполняет английское слово, заполняет русское слово,
            затем нажимает на кнопку "Добавить синоним", кнопка "Добавить слово" недоступна`, () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.englishWord.value = 'englishWord';
        pageObject.englishWord.dispatchEvent(new Event('input'));

        pageObject.russianWord.value = 'englishWord';
        pageObject.russianWord.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        pageObject.click(pageObject.addSynonymButton);

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('true');
    });

    it(`Если пользователь открывает форму добавления слова, заполняет английское слово, заполняет русское слово,
            затем нажимает на кнопку "Добавить синоним", заполняет синоним, кнопка "Добавить слово" доступна`, () => {
        // arrange
        fixture.detectChanges();

        // act
        pageObject.englishWord.value = 'englishWord';
        pageObject.englishWord.dispatchEvent(new Event('input'));

        pageObject.russianWord.value = 'englishWord';
        pageObject.russianWord.dispatchEvent(new Event('input'));

        pageObject.click(pageObject.addSynonymButton);

        pageObject.getByAutomationId('synonym-0').nativeElement.value = 'synonym';
        pageObject
            .getByAutomationId('synonym-0')
            .nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // assert
        expect(pageObject.submitButton.attributes['ng-reflect-disabled']).toBe('false');
    });
});
