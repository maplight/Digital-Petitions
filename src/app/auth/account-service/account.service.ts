import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { delay, Observable, of } from 'rxjs';
import { SignUpForm } from '../sign-up/sign-up-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}
  public signIn() {}

  public signUp(data: SignUpForm): Observable<any> {
    //return of({ result: ':)' }).pipe(delay(3000));
    return of({ error: "An error has occurred :'(" }).pipe(delay(3000));
  }

  public signOut() {}
  public changeEmail() {}
  public changePassword() {}
  public changePersonalDetails() {}
}
