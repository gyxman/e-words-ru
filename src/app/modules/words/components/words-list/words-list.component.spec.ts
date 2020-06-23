import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WordsListComponent} from './words-list.component';
import {WordsListComponentPo} from './words-list.component.po';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {WordsFacadeService} from '../../services/words-facade.service';
import {instance, mock, when} from 'ts-mockito';
import {BehaviorSubject} from 'rxjs';
import {Word} from '../../models/word';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

describe('WordsListComponent - компонент списка слов на изучение', () => {
    let fixture: ComponentFixture<WordsListComponent>;
    let pageObject: WordsListComponentPo<WordsListComponent>;
    let wordsFacadeServiceMock: WordsFacadeService;
    let wordsMock$: BehaviorSubject<Word[]>;

    beforeEach(() => {
        wordsFacadeServiceMock = mock(WordsFacadeService);

        wordsMock$ = new BehaviorSubject([]);
    });

    beforeEach(() => {
        when(wordsFacadeServiceMock.words$).thenReturn(wordsMock$);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatTableModule,
                MatSortModule,
                MatPaginatorModule,
                MatButtonModule,
                MatIconModule,
                MatTooltipModule,
                MatInputModule,
                HttpClientModule,
            ],
            declarations: [WordsListComponent],
            providers: [
                {
                    provide: WordsFacadeService,
                    useFactory: () => instance(wordsFacadeServiceMock),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WordsListComponent);
        pageObject = new WordsListComponentPo(fixture);
    });

    it('Если компонент загрузился, все элементы отрисовались', () => {
        // arrange
        wordsMock$.next([
            {
                id: '1',
                englishWord: 'hello',
                russianWord: 'привет',
                synonyms: ['здравствуй'],
                date: {
                    toDate: () => {
                        return new Date('December 17, 1995 03:24:00');
                    },
                } as any,
                countOfSuccess: 0,
            },
            {
                id: '2',
                englishWord: 'car',
                russianWord: 'машина',
                synonyms: ['автомобиль'],
                date: {
                    toDate: () => {
                        return new Date('December 19, 2000 11:15:10');
                    },
                } as any,
                countOfSuccess: 1,
            },
        ]);

        // act
        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('Если пользователь вводит в поиск поисковую фразу, результат фильтруется по этой фразе', () => {
        // arrange
        wordsMock$.next([
            {
                id: '1',
                englishWord: 'hello',
                russianWord: 'привет',
                synonyms: ['здравствуй'],
                date: {
                    toDate: () => {
                        return new Date('December 17, 1995 03:24:00');
                    },
                } as any,
                countOfSuccess: 0,
            },
            {
                id: '2',
                englishWord: 'car',
                russianWord: 'машина',
                synonyms: ['автомобиль'],
                date: {
                    toDate: () => {
                        return new Date('December 19, 2000 11:15:10');
                    },
                } as any,
                countOfSuccess: 0,
            },
        ]);

        // act
        fixture.detectChanges();

        pageObject.filterInput.value = 'машина';
        pageObject.filterInput.dispatchEvent(new Event('keyup'));

        fixture.detectChanges();

        // assert
        expect(fixture.nativeElement).toMatchSnapshot();
    });
});
