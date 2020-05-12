import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthRouteEnum} from './enums/auth-route.enum';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {path: AuthRouteEnum.Login, component: LoginComponent},
            {path: '', redirectTo: AuthRouteEnum.Login, pathMatch: 'full'},
            {path: '**', redirectTo: AuthRouteEnum.Login},
        ],
    },
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
