import { TestBed } from '@angular/core/testing';
import { API, Auth } from 'aws-amplify';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { RequestUserVerificationCodeResendMutation } from '../api/API';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //signUp
  it('signUp function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signUp = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: '' });
      })
    );
    service
      .signUp({
        address: '',
        aptNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('signUp function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signUp = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .signUp({
        address: '',
        aptNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //signIn
  it('signIn function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signIn = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    service
      .signIn({
        email: '',
        password: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual(user);
        done();
      });
  });

  it('signIn function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signIn = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .signIn({
        email: '',
        password: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //changePassword
  it('changePassword function should return a "CognitoUserFacade" object when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.changePassword = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service
      .changePassword({
        newPassword: '',
        oldPassword: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('changePassword function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.changePassword = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .changePassword({
        newPassword: '',
        oldPassword: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //changePersonalDetails
  it('changePersonalDetails function should return a "CognitoUserFacade" object when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.updateUserAttributes = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service
      .changePersonalDetails({
        address: '',
        aptNumber: '',
        city: '',
        firstName: '',
        lastName: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('changePersonalDetails function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.updateUserAttributes = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .changePersonalDetails({
        address: '',
        aptNumber: '',
        city: '',
        firstName: '',
        lastName: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //changeEmail
  it('changeEmail function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.updateUserAttributes = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service
      .changeEmail({
        email: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('changeEmail function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.updateUserAttributes = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .changeEmail({
        email: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //confirmEmailChange
  it('confirmEmailChange function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.verifyCurrentUserAttributeSubmit = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service
      .confirmEmailChange({
        code: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('confirmEmailChange function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.verifyCurrentUserAttributeSubmit = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .confirmEmailChange({
        code: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //resendSignUp
  it('resendSignUp function should return a boolean value when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: codeResend });
      })
    );
    service.resendSignUp('').subscribe((data) => {
      expect(data.result).toEqual(true);
      done();
    });
  });

  it('resendSignUp function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.resendSignUp('').subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //signOut
  it('signOut function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signOut = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service.signOut().subscribe((data) => {
      expect(data.result).toEqual('SUCCESS');
      done();
    });
  });

  it('signOut function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signOut = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service.signOut().subscribe((data) => {
      expect(data.error).toEqual('Example Error');
      done();
    });
  });

  //setNewPassword
  it('setNewPassword function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.forgotPasswordSubmit = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service
      .setNewPassword({ code: '', newPassword: '', username: '' })
      .subscribe((data) => {
        expect(data.result).toEqual('SUCCESS');
        done();
      });
  });

  it('setNewPassword function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.forgotPasswordSubmit = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service
      .setNewPassword({ code: '', newPassword: '', username: '' })
      .subscribe((data) => {
        expect(data.error).toEqual('Example Error');
        done();
      });
  });

  //forgotPassword
  it('forgotPassword function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.forgotPassword = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service.forgotPassword({ email: '' }).subscribe((data) => {
      expect(data.result).toEqual('SUCCESS');
      done();
    });
  });

  it('forgotPassword function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.forgotPassword = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service.forgotPassword({ email: '' }).subscribe((data) => {
      expect(data.error).toEqual('Example Error');
      done();
    });
  });

  //updateUser
  it('updateUser function should return a "SUCCESS" string when the promise it successful resolve', (done) => {
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    service.updateUser();
    Auth.currentAuthenticatedUser().then((_) => {
      expect(service.currentUser).toEqual(user);
      done();
    });
  });

  it('updateUser function should return a error message when the promise it rejected', (done) => {
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject();
      })
    );
    service.updateUser();
    Auth.currentAuthenticatedUser().catch((_) => {
      expect(service.currentUser).toEqual(undefined);
      done();
    });
  });

  //getCurrentUser
  it('getCurrentUser function should return a "CognitoUserFacade" object when the promise it successful resolve', (done) => {
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    service.getCurrentUser().subscribe((data) => {
      expect(data).toEqual(user);
      done();
    });
  });

  it('getCurrentUser function should return a error message when the promise it rejected', (done) => {
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject();
      })
    );
    service.getCurrentUser().subscribe((data) => {
      expect(data).toEqual(undefined);
      done();
    });
  });

  //signUpConfirm
  it('signUpConfirm function should return a error message when the Auth.confirmSignUp it successful resolve but Auth.SignIn it failed', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.signUp = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: '' });
      })
    );
    Auth.signIn = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );
    Auth.confirmSignUp = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve('');
      })
    );
    service.signUp({
      address: '',
      aptNumber: '',
      email: 'email@test.com',
      firstName: '',
      lastName: '',
      password: 'passwordExample',
      state: '',
      zipCode: '',
    });
    service.signUpConfirm({ code: '', username: '' }).subscribe((data) => {
      expect(data.error).toEqual('Example Error');
      done();
    });
  });

  it('signUpConfirm function should return a error message when the promise it rejected', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.confirmSignUp = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ message: 'Example Error' });
      })
    );

    service.signUpConfirm({ code: '', username: '' }).subscribe((data) => {
      expect(data.error).toEqual('Example Error');
      done();
    });
  });

  //completeNewPassword
  it('completeNewPassword function should return a CognitoUserFacade object when the promise it resolve', (done) => {
    service.updateUser = jasmine.createSpy();
    Auth.completeNewPassword = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.currentAuthenticatedUser = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );
    Auth.signIn = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve(user);
      })
    );

    service
      .signIn({
        email: '',
        password: '',
      })
      .subscribe((data) => {
        service
          .completeNewPassword({
            firstName: '',
            lastName: '',
            password: '',
          })
          .subscribe((data) => {
            expect(data.result).toEqual(user);
            done();
          });
      });
  });
});

const user: CognitoUserFacade = {
  attributes: {
    'custom:access_group': 'admin',
    address: '',
    email: 'example@test.com',
    email_verified: false,
    family_name: '',
    given_name: '',
    sub: '',
  },
  challengeName: 'NEW_PASSWORD_REQUIRED',
  username: '',
};

const codeResend: RequestUserVerificationCodeResendMutation = {
  requestUserVerificationCodeResend: true,
};
