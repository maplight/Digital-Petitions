import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AccountService } from '../auth/account-service/account.service';

@Injectable()
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
    return this._auth.isLoged().pipe(
      map((data) => {
        if (data) {
          return true;
        } else {
          this._router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}