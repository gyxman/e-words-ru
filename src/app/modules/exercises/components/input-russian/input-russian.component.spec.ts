import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InputRussianComponent} from './input-russian.component';
import {Component} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {Word} from '../../../words/models/word';
import {InputRussianComponentPo} from './input-russian.component.po';
import {LoaderModule} from '../../../utils/components/loader/loader.module';
import {MapperModule} from '../../../utils/pipes/mapper/mapper.module';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlErrorModule} from '../../../auth/components/form-control-error/form-control-error.module';
import {ActionsModule} from '../actions/actions.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
    template:
        '<app-input-russian [word$]="word$" [showLoader$]="showLoader$" (answer)="onAnswer($event)"></app-input-russian>',
})
class TestComponent {
    word$: BehaviorSubject<Word> = new BehaviorSubject({
        id: 'wordId',
        englishWord: 'testWord',
    } as Word);
    showLoader$: ReplaySubject<boolean> = new ReplaySubject(1);

    answer: string;

    onAnswer(answer: string) {
        this.answer = answer;
    }
}

describe('InputRussianComponent - упражнение, где пользователь вводит перевод слова на русском', () => {
    let testComponent: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let pageObject: InputRussianComponentPo<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputRussianComponent, TestComponent],
            imports: [
                LoaderModule,
                MapperModule,
                MatInputModule,
                ReactiveFormsModule,
                FormControlErrorModule,
                ActionsModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        pageObject = new InputRussianComponentPo(fixture);
    });

    it('Если компонент загрузился, все элементы отрисовались', () => {
        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пришла информация об отображении лоадера, то отображаем лоадер', () => {
        // arrange
        testComponent.showLoader$.next(true);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loaderComponent.showLoader).toBe(true);
    });

    it('Если информация об отображении лоадера не пришла, то не отображаем лоадер', () => {
        // arrange
        testComponent.showLoader$.next(false);

        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.loaderComponent.showLoader).toBe(false);
    });

    it('Если компонент загрузился, то в поле ответ пусто', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.answerInput.value).toBe('');
    });

    it('Если компонент загрузился, то в компонент actions передаем информацию о блокировке кнопки отправки', () => {
        // act
        fixture.detectChanges();

        // assert
        expect(pageObject.actionsComponent.disabledSubmit).toBe(true);
    });

    it('Если пользователь вводит ответ и нажимает на кнопку отправки ответа, то вызываем метод отправки ответа', () => {
        // arrange
        jest.spyOn(testComponent, 'onAnswer');
        fixture.detectChanges();

        // act
        pageObject.answerInput.value = 'ответ';
        pageObject.answerInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        pageObject.actions.triggerEventHandler('submit', null);

        // assert
        expect(testComponent.onAnswer).toHaveBeenCalledWith('ответ');
    });
});
