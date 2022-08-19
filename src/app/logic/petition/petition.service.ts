import { Injectable } from '@angular/core';
import API, { GraphQLResult } from '@aws-amplify/api';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import {
  CandidatePetition,
  CandidatePetitionInput,
  IssuePetition,
  IssuePetitionInput,
  PetitionStatus,
  PetitionType,
  SubmitCandidatePetitionMutation,
  SubmitIssuePetitionMutation,
} from 'src/app/core/api/API';

import { FilterData, Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

import {
  submitCandidatePetition,
  submitIssuePetition,
} from 'src/graphql/mutations';

@Injectable({ providedIn: 'root' })
export class PetitionService {
  private IssuePetition: 'IssuePetition' = 'IssuePetition';
  private CandidatePetition: 'CandidatePetition' = 'CandidatePetition';
  private AddressData: 'AddressData' = 'AddressData';
  private SignatureSummary: 'SignatureSummary' = 'SignatureSummary';
  constructor() {}

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
      tap((value) => console.log(value)),
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

  editPetitionIssue(data: IssuePetition): Observable<Result<IssuePetition>> {
    return of({ result: data }).pipe(delay(3000));
  }

  editPetitionCandidate(
    data: CandidatePetition
  ): Observable<Result<CandidatePetition>> {
    return of({ result: data }).pipe(delay(3000));
  }

  getPetition(data: number): Observable<Result<ResponsePetition>> {
    return of({
      result: {
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
        },

        /** 
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
          party: 'Green',
          signatureSummary: {
            __typename: this.SignatureSummary,
            approved: 15000,
            deadline: '00/00/0000',
            required: 24000,
            submitted: 20000,
          },
          status: PetitionStatus.ACTIVE,
          name: 'First name and last name',
          type: PetitionType.CANDIDATE,
        },
        */
      },
    }).pipe(delay(1000));
  }

  withdrawPetition(data: number): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  getCommitteePetitions(
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

            status: PetitionStatus.NEW,
            title: 'Title1',
            type: PetitionType.ISSUE,
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
            office: '',
            owner: 'CommitteUser-1',
            party: 'Green',
            status: PetitionStatus.NEW,
            name: 'First name and last name',
            type: PetitionType.ISSUE,
          },
        },
      ],
    }).pipe(delay(3000));
  }

  getInactivePetitions(
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
            party: 'Green',
            signatureSummary: {
              __typename: this.SignatureSummary,
              approved: 15000,
              deadline: '00/00/0000',
              required: 24000,
              submitted: 20000,
            },
            status: PetitionStatus.NEW,
            name: 'First name and last name',
            type: PetitionType.ISSUE,
          },
        },
      ],
    }).pipe(delay(3000));
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
          },
        },
      ],
    }).pipe(delay(3000));
  }
}
