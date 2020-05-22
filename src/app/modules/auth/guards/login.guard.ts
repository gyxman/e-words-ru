import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthFacadeService} from '../services/auth-facade.service';
import {RouteEnum} from '../../../enums/route.enum';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanLoad {
    constructor(private authFacadeService: AuthFacadeService, private router: Router) {}

    canLoad(): boolean {
        return this.checkAuth();
    }

    private checkAuth(): boolean {
        const isAuth = this.authFacadeService.isAuthenticated;

        if (isAuth) {
            this.router.navigate([RouteEnum.User]);

            return false;
        }

        return true;
    }
}
