import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RouteEnum} from './enums/route.enum';
import {LoginComponent} from './components/auth/login/login.component';

const routes: Routes = [
    {
        path: RouteEnum.Auth,
        children: [{path: RouteEnum.Login, component: LoginComponent}],
    },
    {path: '**', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
