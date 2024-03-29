import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../core/account-service/account.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private _auth: AccountService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._auth.getCurrentUser().pipe(
      map((data) => data?.attributes['custom:access_group'] ?? ''),
      map((data) => {
        if (data === 'petitioner') {
          return this._router.parseUrl('/committee/home');
        } else if (
          data === 'admin' ||
          data === 'city_staff' ||
          data === 'city_staff_guest'
        ) {
          return this._router.parseUrl('/city-staff/home');
        } else {
          return true;
        }
      })
    );
  }
}
