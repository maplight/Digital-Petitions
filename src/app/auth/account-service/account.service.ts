import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Result } from 'src/app/core/application/Result';

import { ChangePasswordForm } from '../change-password-modal/change-password-form.interface';
import { PersonalDetailsChangeForm } from '../change-personal-details-modal/personal-details-change-form.interface';
import { EmailChangeForm } from '../email-change-modal/email-change-form.interface';
import { SignInForm } from '../sign-in/sign-in-form.interface';

import { ConfirmEmailChangeForm } from '../confirm-email-change-modal/confirm-email-change-form.interface';

import { User } from '../user';
import { SetNewPasswordForm } from '../set-new-password/set-new-password-form.interface';
import { ForgotPasswordForm } from '../forgot-password/forgot-password-form.interface';
import { SignUpCredentials } from 'src/app/core/models/models';

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

  public signIn(data: SignInForm): Observable<Result<string>> {
    return of({ error: ":'(" }).pipe(delay(3000));
  }

  public changePassword(data: ChangePasswordForm): Observable<Result<string>> {
    return of({ result: ":')" }).pipe(delay(3000));
  }

  public changePersonalDetails(
    data: PersonalDetailsChangeForm
  ): Observable<Result<string>> {
    return of({ result: ":')" }).pipe(delay(3000));
  }

  public changeEmail(data: EmailChangeForm): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public confirmEmailChange(
    data: ConfirmEmailChangeForm
  ): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public signOut(): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public setNewPassword(data: SetNewPasswordForm): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public forgotPassword(data: ForgotPasswordForm): Observable<Result<string>> {
    return of({ result: ':)' }).pipe(delay(3000));
  }

  public checkTokenFP(data: string): Observable<Result<string>> {
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
