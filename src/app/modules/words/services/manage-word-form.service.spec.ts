import {ManageWordFormService} from './manage-word-form.service';
import {TestBed} from '@angular/core/testing';

describe('ManageWordFormService - сервис по работе с формой для добавления и редактирования слов', () => {
    let testedService: ManageWordFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ManageWordFormService],
        });

        testedService = TestBed.inject(ManageWordFormService);
    });

    it('Если форма инициализируется, то в ней присутствуют 2 поля и пустой массив с синонимами', () => {
        // assert
        const expectedValue = {englishWord: null, russianWord: null, synonyms: []};

        expect(testedService.form.value).toEqual(expectedValue);
    });

    it('Если форма инициализируется, то в поле englishWord присутствует валидатор required', () => {
        // assert
        const expectedValue = {
            required: true,
        };

        expect(
            testedService.englishWordControl.validator(testedService.englishWordControl),
        ).toEqual(expectedValue);
    });

    it('Если форма инициализируется, то в поле russianWord присутствует валидатор required', () => {
        // assert
        const expectedValue = {
            required: true,
        };

        expect(
            testedService.russianWordControl.validator(testedService.russianWordControl),
        ).toEqual(expectedValue);
    });

    it('Если форма инициализируется, то массив синонимов пустой', () => {
        // assert
        expect(testedService.synonymsControl.controls.length).toBe(0);
    });

    it('Если вызывается метод добавления синонима, то добавляем в синонимы новое поле с валидатором required', () => {
        // act
        testedService.addSynonym();

        // assert
        const expectedValue = {
            required: true,
        };

        expect(
            testedService.synonymsControl.controls[0].validator(
                testedService.synonymsControl.controls[0],
            ),
        ).toEqual(expectedValue);
    });

    it('Если вызывается метод добавления синонима, а затем метод удаления синонима, то поле синонимы очищается', () => {
        // act
        testedService.addSynonym();
        testedService.removeSynonym(0);

        // assert
        expect(testedService.synonymsControl.controls.length).toBe(0);
    });

    it('Если вызывается метод очистки формы, то форма сбрасывается в первоначальное состояние', () => {
        // arrange
        testedService.russianWordControl.setValue('testValue');
        testedService.addSynonym();

        // act
        testedService.clearForm();

        // assert
        expect(testedService.form.value).toEqual({
            englishWord: null,
            russianWord: null,
            synonyms: [],
        });
    });
});
