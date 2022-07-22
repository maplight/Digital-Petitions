import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, Observable, of } from 'rxjs';

import { User } from '../user';
import {
  ChangeEmailData,
  ChangePasswordData,
  ConfirmationCode,
  PersonalDetailsToUpdate,
  RecoverPasswordData,
  Result,
  SignInCredentials,
  SignUpCredentials,
} from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private privateCurrentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.privateCurrentUser.asObservable();

  constructor() {}

  public signUp(data: SignUpCredentials): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public signIn(data: SignInCredentials): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public changePassword(data: ChangePasswordData): Observable<Result<string>> {
    return of({ result: ":')" }).pipe(delay(3000));
  }

  public changePersonalDetails(
    data: PersonalDetailsToUpdate
  ): Observable<Result<string>> {
    return of({ result: ":')" }).pipe(delay(3000));
  }

  public changeEmail(data: ChangeEmailData): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public confirmEmailChange(
    data: ConfirmationCode
  ): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public signOut(): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public setNewPassword(data: ChangePasswordData): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public forgotPassword(data: RecoverPasswordData): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public checkTokenFP(data: ConfirmationCode): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public updateUser(login: boolean) {
    //temporarily I use a boolean to mock this service
    //call to backend
    login
      ? this.privateCurrentUser.next({
          firstName: 'Jon',
          lastName: 'Smith',
          email: 'jonsmith@example',
          url: '',
          contactData: {
            address: 'far far away',
            apt_number: '00',
            state: 'some state',
            zip_code: '102030',
          },
        })
      : this.privateCurrentUser.next(null);
  }
}
