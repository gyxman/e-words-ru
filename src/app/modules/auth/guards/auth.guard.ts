import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFacadeService} from '../services/auth-facade.service';
import {AuthRouteEnum} from '../enums/auth-route.enum';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authFacadeService: AuthFacadeService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authFacadeService.isAuthenticated.pipe(
            take(1),
            map(isAuthenticated =>
                isAuthenticated
                    ? true
                    : this.router.createUrlTree([AuthRouteEnum.Login], {
                          queryParams: {loginAgain: true},
                      }),
            ),
        );
    }
}
