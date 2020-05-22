import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthFacadeService} from '../services/auth-facade.service';
import {AuthRouteEnum} from '../enums/auth-route.enum';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {
    constructor(private authFacadeService: AuthFacadeService, private router: Router) {}

    canLoad(): boolean {
        return this.checkAuth();
    }

    private checkAuth(): boolean {
        const isAuth = this.authFacadeService.isAuthenticated;

        if (!isAuth) {
            this.router.navigate([AuthRouteEnum.Login], {
                queryParams: {loginAgain: true},
            });

            return false;
        }

        return true;
    }
}
