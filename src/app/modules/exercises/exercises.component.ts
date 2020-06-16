import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {InputRussianComponent} from './components/input-russian/input-russian.component';
import {ExercisesFacadeService} from './services/exercises-facade.service';
import {ComponentEnum} from './enums/component.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LayoutRouteEnum} from '../layout/enums/layout-route.enum';
import {RouteEnum} from '../../enums/route.enum';

const components = {
    [ComponentEnum.InputRussian]: InputRussianComponent,
};

@Component({
    selector: 'app-exercises',
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent implements OnInit, OnDestroy {
    @ViewChild('exerciseContainer', {static: true, read: ViewContainerRef})
    exerciseContainer: ViewContainerRef;

    showLoader$ = this.exercisesFacadeService.showLoader$;

    private destroy$ = new Subject<boolean>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private exercisesFacadeService: ExercisesFacadeService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(data => {
            if (!data || !data.component) {
                this.router.navigate([RouteEnum.User, LayoutRouteEnum.Catalog]);

                return;
            }

            this.createComponent(data.component);
        });

        // TODO раскомментировать после сохранения текущего упражнения в localStorage
        // this.router.navigate([], {queryParams: null});
        // this.exercisesFacadeService.generateWord();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    private createComponent(componentName) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            components[componentName],
        );
        const component = this.exerciseContainer.createComponent(componentFactory);

        (component.instance as any).word$ = this.exercisesFacadeService.word$;
        (component.instance as any).showLoader$ = this.exercisesFacadeService.showLoader$;
        (component.instance as any).answer
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                this.exercisesFacadeService.checkAnswer(data);
            });
    }
}
