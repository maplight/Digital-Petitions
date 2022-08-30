import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Member } from 'src/app/shared/models/admin/member';
import { Result } from 'src/app/shared/models/exports';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAllUser(cursor?: string): Observable<Result<Member[]>> {
    console.log('?????');
    return of({
      result: [
        {
          email: 'marvin.mckinney@email.com',
          name: 'Marvin McKinney (You)',
          status: 'Admin',
        },
        {
          email: 'marvin.mckinney2@email.com',
          name: 'Marvin McKinney (Not You)',
          status: 'Member',
        },
      ],
    }).pipe(delay(3000));
  }
}
