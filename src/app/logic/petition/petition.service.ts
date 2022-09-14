import { Injectable } from '@angular/core';
import API, { GraphQLResult } from '@aws-amplify/api';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import {
  ApprovePetitionMutation,
  CandidatePetition,
  CandidatePetitionInput,
  EditCandidatePetitionInput,
  EditCandidatePetitionMutation,
  EditIssuePetitionInput,
  EditIssuePetitionMutation,
  GetPetitionQuery,
  GetPetitionsByOwnerQuery,
  GetPetitionsByTypeQuery,
  IssuePetition,
  IssuePetitionInput,
  PetitionsByOwnerInput,
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
  SubmitCandidatePetitionMutation,
  SubmitIssuePetitionMutation,
  TargetPetitionInput,
} from 'src/app/core/api/API';
import { AccountService } from 'src/app/core/account-service/account.service';

import { FilterData, Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

import {
  approvePetition,
  editCandidatePetition,
  editIssuePetition,
  rejectPetition,
  submitCandidatePetition,
  submitIssuePetition,
} from 'src/graphql/mutations';
import {
  getPetition,
  getPetitionsByOwner,
  getPetitionsByType,
} from 'src/graphql/queries';
import { __values } from 'tslib';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { LoggingService } from 'src/app/core/logging/loggin.service';

@Injectable({ providedIn: 'root' })
export class PetitionService {
  private IssuePetition: 'IssuePetition' = 'IssuePetition';
  private CandidatePetition: 'CandidatePetition' = 'CandidatePetition';
  private AddressData: 'AddressData' = 'AddressData';
  private SignatureSummary: 'SignatureSummary' = 'SignatureSummary';
  constructor(private _loggingService: LoggingService) {}

  newIssuePetition(
    data: IssuePetitionInput
  ): Observable<Result<IssuePetition>> {
    return from(
      API.graphql({
        query: submitIssuePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<SubmitIssuePetitionMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.submitIssuePetition })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  newCandidatePetition(
    data: CandidatePetitionInput
  ): Observable<Result<CandidatePetition>> {
    return from(
      API.graphql({
        query: submitCandidatePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<SubmitCandidatePetitionMutation>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: data?.submitCandidatePetition })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  signPetition(data: SignaturePetitionData): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  confirmSignaturePetition(data: string): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  editPetitionIssue(
    data: EditIssuePetitionInput
  ): Observable<Result<IssuePetition>> {
    return from(
      API.graphql({
        query: editIssuePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<EditIssuePetitionMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.editIssuePetition as IssuePetition })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  editPetitionCandidate(
    data: EditCandidatePetitionInput
  ): Observable<Result<CandidatePetition>> {
    return from(
      API.graphql({
        query: editCandidatePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<EditCandidatePetitionMutation>>
    ).pipe(
      map(({ data }) => ({
        result: data?.editCandidatePetition as CandidatePetition,
      })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  getPetition(id: string): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: getPetition,
        variables: {
          PK: id,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionQuery>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.getPetition?.type === PetitionType.ISSUE) {
            petition = { dataIssue: value.data.getPetition as IssuePetition };
          } else if (value.data.getPetition?.type === PetitionType.CANDIDATE) {
            petition = {
              dataCandidate: value.data.getPetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  withdrawPetition(data: number): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  approvePetition(
    data: TargetPetitionInput
  ): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: approvePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<ApprovePetitionMutation>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.approvePetition?.type === PetitionType.ISSUE) {
            petition = {
              dataIssue: value.data.approvePetition as IssuePetition,
            };
          } else if (
            value.data.approvePetition?.type === PetitionType.CANDIDATE
          ) {
            petition = {
              dataCandidate: value.data.approvePetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  denyPetition(
    data: TargetPetitionInput
  ): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: rejectPetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<ApprovePetitionMutation>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.approvePetition?.type === PetitionType.ISSUE) {
            petition = {
              dataIssue: value.data.approvePetition as IssuePetition,
            };
          } else if (
            value.data.approvePetition?.type === PetitionType.CANDIDATE
          ) {
            petition = {
              dataCandidate: value.data.approvePetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  getCommitteePetitions(
    data: PetitionsByOwnerInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByOwner,
        variables: {
          query: {
            status: data.status,
            owner: data.owner,
            cursor: data.cursor,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByOwnerQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByOwner.token
          ? value.data?.getPetitionsByOwner.token
          : undefined;

        value.data?.getPetitionsByOwner.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getInactivePetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {
          query: {
            status: data.status,
            cursor: data.cursor,
            type: data.type,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getCityStaffPetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {
          query: {
            status: data.status,
            cursor: data.cursor,
            type: data.type,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getActivePetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {
          query: {
            status: data.status,
            cursor: data.cursor,
            type: data.type,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }
}
