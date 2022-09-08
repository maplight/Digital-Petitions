import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import {
  AssetType,
  CreateStaffUserMutation,
  ListResourcesInput,
  SiteConfiguration,
  SiteConfigurationInput,
  StaffUserInput,
  UpdateSiteConfigurationMutation,
  UpdatedSiteConfigurationSubscription,
  User,
  GetResourceUploadURLQuery,
} from 'src/app/core/api/API';
import { Member } from 'src/app/shared/models/admin/member';

import { TemeData } from 'src/app/shared/models/admin/teme-data';

import { Result } from 'src/app/shared/models/exports';
import {
  createStaffUser,
  updateSiteConfiguration,
} from 'src/graphql/mutations';
import { getResourceUploadURL, getSiteResources } from 'src/graphql/queries';
import { updatedSiteConfiguration } from 'src/graphql/subscriptions';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _httpClient: HttpClient) {}

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

  setTemeData(
    config: SiteConfigurationInput
  ): Observable<Result<SiteConfiguration>> {
    from(
      API.graphql({
        query: getResourceUploadURL,
        variables: { query: { type: AssetType.LOGO } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetResourceUploadURLQuery>>
    )
      .pipe(
        map(({ data }) => data?.getResourceUploadURL),

        tap((data) => {
          var configu = {
            headers: {
              'Content-Type': 'undefined',
            },
          };
          if (data) {
            this._httpClient
              .put(data, config.logoImage, configu)
              .subscribe((data) => console.log(data));
          }
        })
        //catchError((error) => of({ error: error?.[0]?.message })),
      )
      .subscribe();

    return from(
      API.graphql({
        query: updateSiteConfiguration,
        variables: { config },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<UpdateSiteConfigurationMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.updateSiteConfiguration })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  getTemeData(): Observable<Result<SiteConfiguration | null>> {
    //API.graphql(graphqlOperation(updatedSiteConfiguration));

    return of({
      result: {
        __typename: 'SiteConfiguration',
        buttonColor: '#FFFFFF',
        headerColor: '#FFFFFF',
        highlightColor: '#FFFFFF',
        logoImage:
          'data:image/png;base64,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',
        version: 1,
      },
    });
  }
}
