import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { catchError, delay, from, map, Observable, of } from 'rxjs';
import {
  CreateStaffUserMutation,
  StaffUserInput,
  User,
} from 'src/app/core/api/API';
import { Member } from 'src/app/shared/models/admin/member';

import { NewMemberData } from 'src/app/shared/models/admin/new-member-data';

import { Result } from 'src/app/shared/models/exports';
import { createStaffUser } from 'src/graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAllUser(cursor?: string): Observable<Result<Member[]>> {
    return of({
      result: [
        {
          id: '0',

          email: 'marvin.mckinney@email.com',
          name: 'Marvin McKinney (You)',
          status: 'Admin',
        },
        {
          id: '0',

          email: 'marvin.mckinney2@email.com',
          name: 'Marvin McKinney (Not You)',
          status: 'Member',
        },
      ],
    }).pipe(delay(3000));
  }

  newMember(data: StaffUserInput): Observable<Result<User>> {
    return from(
      API.graphql({
        query: createStaffUser,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<CreateStaffUserMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.createStaffUser })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }
  changeAccountPermission(data: {
    id: string;
    value: 'admin' | 'guest' | 'member';
  }): Observable<Result<string>> {
    return of({
      result: 'SUCCESS',
    }).pipe(delay(3000));
  }
  getAccountPermission(id: string): Observable<Result<string>> {
    return of({
      result: 'member',
    }).pipe(delay(3000));
  }
  removeMember(id: string): Observable<Result<string>> {
    return of({
      result: 'SUCCESS',
    }).pipe(delay(3000));
  }
}
