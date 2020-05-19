import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginModule} from './components/login/login.module';
import {AuthStoreModule} from './store/auth-store.module';
import {AuthFacadeService} from './services/auth-facade.service';

@NgModule({
    imports: [CommonModule, AuthRoutingModule, AuthStoreModule, LoginModule],
    declarations: [AuthComponent],
    exports: [AuthComponent],
    providers: [AuthFacadeService],
})
export class AuthModule {}
