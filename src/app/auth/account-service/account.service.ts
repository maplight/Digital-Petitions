import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, delay, from, Observable, of } from 'rxjs';

import {
  ChangeEmailData,
  ChangePasswordData,
  ConfirmationCode,
  PersonalDetailsToUpdate,
  RecoverPasswordData,
  Result,
  SignInCredentials,
  SignUpCredentials,
} from 'src/app/shared/models/exports';

import { API, Auth } from 'aws-amplify';
import { SignUpConfirmationCode } from 'src/app/shared/models/auth/sign-up-confirmation-code';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private privateCurrentUser: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  private privateisLoged: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentUser$: Observable<any | null> =
    this.privateCurrentUser.asObservable();
  public isLoged$: Observable<boolean> = this.privateisLoged.asObservable();

  constructor() {}

  public signUp(data: SignUpCredentials): Observable<Result<string>> {
    return from(
      Auth.signUp({
        username: data.email.replace(/[^a-zA-Z0-9]/g, ''),
        password: data.password,
        attributes: {
          name: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
          }),
          email: data.email,
          address: JSON.stringify({
            address: data.address,
            state: data.state,
            aptNumber: data.aptNumber,
            zipCode: data.zipCode,
          }),
        },
      })
        .then(function (data) {
          console.log(data);
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public signIn(data: SignInCredentials): Observable<Result<string>> {
    return from(
      Auth.signIn(data.email, data.password)
        .then((data) => {
          console.log(data);
          this.updateUser();
          return { result: 'SUCCESS' };
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
  }

  public changePassword(data: ChangePasswordData): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.changePassword(
          user,
          '' + data.oldPassword,
          '' + data.newPassword
        )
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }

  public changePersonalDetails(
    data: PersonalDetailsToUpdate
  ): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.updateUserAttributes(user, {
          name: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
          }),
          address: JSON.stringify({
            address: data.address,
            state: data.state,
            aptNumber: data.aptNumber,
            zipCode: data.zipCode,
          }),
        })
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }

  public changeEmail(data: ChangeEmailData): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.updateUserAttributes(user, {
          email: data.email,
        })
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }

  public confirmEmailChange(
    data: ConfirmationCode
  ): Observable<Result<string>> {
    return from(
      Auth.verifyCurrentUserAttributeSubmit('email', data.code)
        .then((result) => {
          this.updateUser();
          return { result: 'SUCCESS' };
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
  }

  public signUpConfirm(
    data: SignUpConfirmationCode
  ): Observable<Result<string>> {
    return from(
      Auth.confirmSignUp(data.username.replace(/[^a-zA-Z0-9]/g, ''), data.code)
        .then((result) => {
          this.updateUser();
          return { result: ':)' };
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
  }

  public signOut(): Observable<Result<string>> {
    return from(
      Auth.signOut()
        .then((data) => {
          this.privateCurrentUser.next(null);
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
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

  public updateUser() {
    Auth.currentUserInfo()
      .then((data: any) => {
        this.privateCurrentUser.next(data);
      })
      .catch((error) => {
        this.privateCurrentUser.next(null);
      });
  }

  public isLoged(): Observable<boolean> {
    return from(
      Auth.currentSession()
        .then(() => {
          this.privateisLoged.next(true);
          this.updateUser();
          return true;
        })
        .catch(() => {
          this.privateisLoged.next(false);
          return false;
        })
    );
  }
}
