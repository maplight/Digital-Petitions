import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  delay,
  from,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';

import {
  ChangeEmailData,
  ChangePasswordData,
  ConfirmationCode,
  NewPasswordData,
  PersonalDetailsToUpdate,
  RecoverPasswordData,
  Result,
  SignInCredentials,
  SignUpCredentials,
} from 'src/app/shared/models/exports';

import { API, Auth } from 'aws-amplify';
import { SignUpConfirmationCode } from 'src/app/shared/models/auth/sign-up-confirmation-code';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { AdminSignUpData } from 'src/app/shared/models/auth/admin-sign-up-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userInfo!: SignUpCredentials;
  private isAuthenticatedController: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentUser!: CognitoUserFacade | undefined;
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedController.asObservable();

  /** The CognitoUser as it comes from the Auth.signIn method. */
  private _pristineCognitoUser: any;

  constructor() {}

  public signUp(data: SignUpCredentials): Observable<Result<string>> {
    this.userInfo = data;
    return from(
      Auth.signUp({
        username: data.email.replace(/[^a-zA-Z0-9]/g, ''),
        password: data.password,
        attributes: {
          given_name: data.firstName,
          family_name: data.lastName,
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
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public signIn(
    data: SignInCredentials
  ): Observable<Result<CognitoUserFacade>> {
    return from(
      Auth.signIn(data.email, data.password)
        .then((data: any) => {
          this._pristineCognitoUser = data;

          this.updateUser();

          return { result: data as CognitoUserFacade };
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

  /**
   * Completes the process of setting a new password and personal details for new admin users.
   *
   * @param accountDetails Personal details and password of the admin account.
   * @returns An observable with the success or error result.
   */
  public completeNewPassword(
    accountDetails: AdminSignUpData
  ): Observable<Result<CognitoUserFacade>> {
    if (!this._pristineCognitoUser) {
      return throwError(() => ({
        message: 'Please sign in first.',
      }));
    }

    // creating a clousure to avoid callback hell, notice this is an Immediately Invoked Function Expression (IIFE)
    const _tmp = (async () => {
      try {
        await Auth.completeNewPassword(
          this._pristineCognitoUser,
          accountDetails.password + '',
          {
            address: '""',
            given_name: accountDetails.firstName,
            family_name: accountDetails.lastName,
          }
        );

        return { result: await Auth.currentAuthenticatedUser() };
      } catch (error: any) {
        return { error: error.message };
      }
    })();

    return from(_tmp);
  }

  public changePersonalDetails(
    data: PersonalDetailsToUpdate
  ): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.updateUserAttributes(user, {
          given_name: data.firstName,
          family_name: data.lastName,
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

  public resendSignUp(email: string): Observable<Result<string>> {
    return from(
      Auth.resendSignUp(email)
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
        .then((_) => {
          return Auth.signIn(this.userInfo.email, this.userInfo.password)
            .then((data: any) => {
              this._pristineCognitoUser = data;
              console.log('aqui');
              this.updateUser();

              return { result: 'SUCCESS' };
            })
            .catch((error) => {
              return { error: error.message };
            });
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
          this.currentUser = undefined;
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public setNewPassword(data: NewPasswordData): Observable<Result<string>> {
    return from(
      Auth.forgotPasswordSubmit(data.username, data.code, data.newPassword)
        .then((data) => {
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public forgotPassword(data: RecoverPasswordData): Observable<Result<string>> {
    return from(
      Auth.forgotPassword(data.email)
        .then((data) => {
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public updateUser() {
    Auth.currentAuthenticatedUser()
      .then((data: CognitoUserFacade) => {
        this.currentUser = data;
      })
      .catch((_) => {
        this.currentUser = undefined;
      });
  }

  public getCurrentUser(): Observable<CognitoUserFacade | undefined> {
    return from(
      Auth.currentAuthenticatedUser()
        .then((data) => {
          this.isAuthenticatedController.next(true);
          this.updateUser();
          return data as CognitoUserFacade;
        })
        .catch(() => {
          this.isAuthenticatedController.next(false);
          return undefined;
        })
    );
  }
}
