import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExercisesComponent} from './exercises.component';
import {ExercisesComponentPo} from './exercises.component.po';
import {LoaderModule} from '../utils/components/loader/loader.module';
import {ExercisesFacadeService} from './services/exercises-facade.service';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InputRussianModule} from './components/input-russian/input-russian.module';

// TODO дописать тесты
describe('ExercisesComponent - компонент для вывода упражнений', () => {
    let component: ExercisesComponent;
    let fixture: ComponentFixture<ExercisesComponent>;
    let pageObject: ExercisesComponentPo<ExercisesComponent>;
    let exercisesFacadeServiceMock: ExercisesFacadeService;
    let showLoader$: BehaviorSubject<boolean>;
    let routeMock: ActivatedRoute;
    let queryParamsMock$: ReplaySubject<Params>;
    let routerMock: Router;

    beforeEach(() => {
        exercisesFacadeServiceMock = mock(ExercisesFacadeService);
        routeMock = mock(ActivatedRoute);
        routerMock = mock(Router);

        showLoader$ = new BehaviorSubject(false);
        queryParamsMock$ = new ReplaySubject(1);
    });

    beforeEach(() => {
        when(exercisesFacadeServiceMock.showLoader$).thenReturn(showLoader$);
        when(routeMock.queryParams).thenReturn(queryParamsMock$);

        queryParamsMock$.next({});
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExercisesComponent],
            imports: [LoaderModule, InputRussianModule],
            providers: [
                {
                    provide: ExercisesFacadeService,
                    useFactory: () => instance(exercisesFacadeServiceMock),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(routeMock),
                },
                {
                    provide: Router,
                    useFactory: () => instance(routerMock),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExercisesComponent);
        component = fixture.componentInstance;
        pageObject = new ExercisesComponentPo(fixture);
    });

    describe('showLoader - отображение лоадера на странице', () => {
        it('Если пришла информация об отображении лоадера, то показываем его', () => {
            // arrange
            showLoader$.next(true);

            // act
            fixture.detectChanges();

            // assert
            expect(pageObject.loader.showLoader).toBe(true);
        });

        it('Если информация об отображении лоадера не пришла, то не показываем его', () => {
            // arrange
            showLoader$.next(false);

            // act
            fixture.detectChanges();

            // assert
            expect(pageObject.loader.showLoader).toBe(false);
        });
    });

    it('Если в адресной строке не передан компонент, то навигируем пользователя на страницу каталога', () => {
        // arrange
        queryParamsMock$.next(null);

        // act
        fixture.detectChanges();

        // assert
        verify(routerMock.navigate(deepEqual(['user', 'catalog']))).once();
    });
});
