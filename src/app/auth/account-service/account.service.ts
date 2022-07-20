import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { delay, Observable, of } from 'rxjs';
import { Result } from 'src/app/core/application/Result';
import { ChangePasswordForm } from '../change-password-modal/change-password-form.interface';
import { SignInForm } from '../sign-in/sign-in-form.interface';
import { SignUpForm } from '../sign-up/sign-up-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  public signUp(data: SignUpForm): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public signIn(data: SignInForm): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public changePassword(data: ChangePasswordForm): Observable<Result<string>> {
    return of({ result: ":')" }).pipe(delay(3000));
  }

  public signOut() {}
  public changeEmail() {}
  public changePersonalDetails() {}
}
