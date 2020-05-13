import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteEnum} from './enums/route.enum';

const routes: Routes = [
    {
        path: RouteEnum.Auth,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: RouteEnum.User,
        loadChildren: () =>
            import('./modules/layout/layout.module').then(m => m.LayoutModule),
    },
    {path: '**', redirectTo: RouteEnum.User},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
