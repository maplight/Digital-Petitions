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
    return this._auth.isLoged().pipe(
      map((data) => {
        if (data?.attributes['custom:access_group'] === 'petitioner') {
          return this._router.parseUrl('/committee/home');
        } else if (data?.attributes['custom:access_group'] === 'admin') {
          return this._router.parseUrl('/city-staff/home');
        } else {
          return true;
        }
      })
    );
  }
}
