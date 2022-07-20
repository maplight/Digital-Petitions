import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { delay, Observable, of } from 'rxjs';
import { Result } from 'src/app/core/application/Result';
import { SignUpForm } from '../sign-up/sign-up-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}
  public signIn() {}

  public signUp(data: SignUpForm): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public signOut() {}
  public changeEmail() {}
  public changePassword() {}
  public changePersonalDetails() {}
}
