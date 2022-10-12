import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AccountService } from '../core/account-service/account.service';

@Injectable({
  providedIn: 'root',
})
export class CommitteeGuard implements CanActivate {
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
      map((data) => {
        if (data?.attributes['custom:access_group'] === 'petitioner') {
          return true;
        } else {
          return this._router.parseUrl('/auth/login');
        }
      })
    );
  }
}
