import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { catchError, delay, from, map, Observable, of } from 'rxjs';
import {
  ApproveSignatureMutation,
  GetSignaturesByPetitionQuery,
  RejectSignatureMutation,
  Signature,
  SignatureConnection,
  SignaturesByPetitionInput,
  TargetSignatureInput,
} from 'src/app/core/api/API';
import { FilterData, Result } from 'src/app/shared/models/exports';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';
import { approveSignature, rejectSignature } from 'src/graphql/mutations';
import { getSignaturesByPetition } from 'src/graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  constructor() {}

  getSignatures(
    data: SignaturesByPetitionInput
  ): Observable<Result<SignatureConnection>> {
    return from(
      API.graphql({
        query: getSignaturesByPetition,
        variables: { query: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetSignaturesByPetitionQuery>>
    ).pipe(
      map(({ data }) => ({ result: data?.getSignaturesByPetition })),
      catchError((error) => of({ error: error?.errors[0]?.message }))
    );
  }
  approveSignature(data: TargetSignatureInput): Observable<Result<Signature>> {
    return from(
      API.graphql({
        query: approveSignature,
        variables: { data: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<ApproveSignatureMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.approveSignature as Signature })),
      catchError((error) => of({ error: error?.errors[0]?.message }))
    );
  }
  denySignature(id: string[]): Observable<Result<string>> {
    return of({
      result: id.length.toString(),
    }).pipe(delay(3000));
  }
}
