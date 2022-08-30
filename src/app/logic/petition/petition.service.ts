import { Injectable } from '@angular/core';
import API, { GraphQLResult } from '@aws-amplify/api';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import {
  CandidatePetition,
  CandidatePetitionInput,
  EditIssuePetitionInput,
  EditIssuePetitionMutation,
  GetPetitionQuery,
  GetPetitionsByOwnerQuery,
  GetPetitionsByTypeQuery,
  IssuePetition,
  IssuePetitionInput,
  Petition,
  PetitionListStatusCheck,
  PetitionStatus,
  PetitionType,
  SubmitCandidatePetitionMutation,
  SubmitIssuePetitionMutation,
} from 'src/app/core/api/API';
import { AccountService } from 'src/app/core/account-service/account.service';

import { FilterData, Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

import {
  editIssuePetition,
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
      catchError((error) => of({ error: error?.[0]?.message }))
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
    data: CandidatePetition
  ): Observable<Result<CandidatePetition>> {
    return of({ result: data }).pipe(delay(3000));
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

  approvePetition(data: {
    data: { deadline: string; signatures: string };
    id: string;
  }): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  denyPetition(data: { id: string }): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  getCommitteePetitions(data: {
    id: string;
    cursor?: string;
  }): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByOwner,
        variables: {
          query: {
            status: PetitionListStatusCheck.ANY,
            owner: data.id,
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
    filter: FilterData[]
  ): Observable<Result<ResponsePetition[]>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: [] })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  getActivePetitions(
    filter: FilterData[]
  ): Observable<Result<ResponsePetition[]>> {
    return of({
      result: [
        {
          dataIssue: {
            __typename: this.IssuePetition,
            PK: '0',
            createdAt: '00/00/0000',
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            owner: 'CommitteUser-1',
            signatureSummary: {
              __typename: this.SignatureSummary,
              approved: 15000,
              deadline: '00/00/0000',
              required: 24000,
              submitted: 20000,
            },
            status: PetitionStatus.NEW,
            title: 'Title1',
            type: PetitionType.ISSUE,
            updatedAt: '00/00/0000',
            version: 1,
          },
        },
        {
          dataIssue: {
            __typename: this.IssuePetition,
            PK: '0',
            createdAt: '00/00/0000',
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            owner: 'CommitteUser-1',
            signatureSummary: {
              __typename: this.SignatureSummary,
              approved: 15000,
              deadline: '00/00/0000',
              required: 24000,
              submitted: 20000,
            },
            status: PetitionStatus.NEW,
            title: 'Title1',
            type: PetitionType.ISSUE,
            updatedAt: '00/00/0000',
            version: 1,
          },
        },
        {
          dataCandidate: {
            __typename: this.CandidatePetition,
            PK: '0',
            address: {
              __typename: this.AddressData,
              address: 'address',
              city: 'city',
              number: '22',
              state: 'Alaska',
              zipCode: '1200',
            },
            createdAt: '00/00/0000',
            office: 'My Office',
            owner: 'CommitteUser-1',
            signatureSummary: {
              __typename: this.SignatureSummary,
              approved: 15000,
              deadline: '00/00/0000',
              required: 24000,
              submitted: 20000,
            },
            party: 'Green',
            status: PetitionStatus.NEW,
            name: 'First name and last name',
            type: PetitionType.ISSUE,
            updatedAt: '00/00/0000',
            version: 1,
          },
        },
      ],
    }).pipe(delay(3000));
  }
}
