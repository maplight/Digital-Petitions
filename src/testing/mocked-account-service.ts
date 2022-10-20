import { CognitoUserFacade } from 'src/app/shared/models/auth/user';

export class MockedAccountService {
  get currentUser(): CognitoUserFacade | undefined {
    return undefined;
  }
}
