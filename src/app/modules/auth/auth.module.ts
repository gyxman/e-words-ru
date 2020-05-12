import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginModule} from './components/login/login.module';

@NgModule({
    imports: [CommonModule, AuthRoutingModule, LoginModule],
    declarations: [AuthComponent],
    exports: [AuthComponent],
})
export class AuthModule {}
