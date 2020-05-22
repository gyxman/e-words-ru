import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteEnum} from './enums/route.enum';
import {LoginGuard} from './modules/auth/guards/login.guard';
import {AuthGuard} from './modules/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: RouteEnum.Auth,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        canLoad: [LoginGuard],
    },
    {
        path: RouteEnum.User,
        loadChildren: () =>
            import('./modules/layout/layout.module').then(m => m.LayoutModule),
        canLoad: [AuthGuard],
    },
    {path: '**', redirectTo: RouteEnum.Auth},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
