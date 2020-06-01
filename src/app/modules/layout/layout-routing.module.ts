import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {LayoutRouteEnum} from './enums/layout-route.enum';
import {AddWordComponent} from '../words/components/add-word/add-word.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CatalogComponent} from './components/catalog/catalog.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: LayoutRouteEnum.Dashboard,
                component: DashboardComponent,
            },
            {
                path: LayoutRouteEnum.Catalog,
                component: CatalogComponent,
            },
            {
                path: LayoutRouteEnum.AddWord,
                component: AddWordComponent,
            },
            // {
            //     path: LayoutRouteEnum.Start,
            //     loadChildren: () =>
            //         import('../exercises/exercises.module').then(m => m.ExercisesModule),
            // },
            {path: '', redirectTo: LayoutRouteEnum.Dashboard, pathMatch: 'full'},
            {path: '**', redirectTo: ''},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
