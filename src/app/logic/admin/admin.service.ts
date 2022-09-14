import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';

import {
  AssetType,
  CreateStaffUserMutation,
  ListResourcesInput,
  SiteConfiguration,
  SiteConfigurationInput,
  StaffUserInput,
  User,
  GetResourceUploadURLQuery,
  ResourceConnection,
  GetSiteResourcesQuery,
  SiteConfigurationQuery,
} from 'src/app/core/api/API';
import { Member } from 'src/app/shared/models/admin/member';

import { Result } from 'src/app/shared/models/exports';
import {
  createStaffUser,
  updateSiteConfiguration,
} from 'src/graphql/mutations';
import {
  getResourceUploadURL,
  getSiteResources,
  siteConfiguration,
} from 'src/graphql/queries';

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

  setThemeData(config: SiteConfigurationInput): Observable<Result<any>> {
    return from(
      API.graphql({
        query: updateSiteConfiguration,
        variables: { data: config },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<any>>
    ).pipe(
      map(({ data }) => ({ result: data })),
      catchError((error) => of({ error: error }))
    );
  }

  getUrlResource(): Observable<Result<string | null>> {
    return from(
      API.graphql({
        query: getResourceUploadURL,
        variables: { query: { type: AssetType.LOGO } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetResourceUploadURLQuery>>
    ).pipe(
      map(({ data }) => ({ result: data?.getResourceUploadURL })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  setImg(value: {
    url: string;
    img: File | Blob | ArrayBuffer;
  }): Observable<Result<any>> {
    return this._httpClient.put(value.url, value.img).pipe(
      tap((_) => this.getImg({ type: AssetType.LOGO })),
      map((data) => ({ result: data })),
      catchError((error) => of({ error: error }))
    );
  }

  getImg(data: ListResourcesInput): Observable<Result<ResourceConnection>> {
    return from(
      API.graphql({
        query: getSiteResources,
        variables: { query: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetSiteResourcesQuery>>
    ).pipe(
      map(({ data }) => ({ result: data?.getSiteResources })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  getThemeData(): Observable<Result<SiteConfiguration>> {
    return from(
      API.graphql({
        query: siteConfiguration,
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<SiteConfigurationQuery>>
    ).pipe(
      map(({ data }) => ({ result: data?.siteConfiguration })),
      catchError(
        (error) => (console.log(error), of({ error: error?.[0]?.message }))
      )
    );
  }
}
