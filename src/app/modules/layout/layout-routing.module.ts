import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {LayoutRouteEnum} from './enums/layout-route.enum';
import {AddWordComponent} from '../words/components/add-word/add-word.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

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
                path: LayoutRouteEnum.AddWord,
                component: AddWordComponent,
            },
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
