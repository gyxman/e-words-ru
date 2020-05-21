import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthFacadeService} from '../services/auth-facade.service';
import {map, take} from 'rxjs/operators';
import {RouteEnum} from '../../../enums/route.enum';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authFacadeService: AuthFacadeService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authFacadeService.isAuthenticated.pipe(
            take(1),
            map(isAuthenticated =>
                isAuthenticated ? this.router.createUrlTree([RouteEnum.User]) : true,
            ),
        );
    }
}
