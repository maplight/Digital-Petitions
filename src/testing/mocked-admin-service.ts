import { Observable } from 'rxjs';
import { UpdateUserAccessInput, User } from 'src/app/core/api/API';
import { Result } from 'src/app/shared/models/exports';

export class MockedAdminService {
  changeAccountPermission(
    value: UpdateUserAccessInput
  ): Observable<Result<User>> {
    return new Observable();
  }
}
