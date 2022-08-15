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
} from 'src/app/core/api/API';

import {
  CandidatePetitionData,
  FilterData,
  Result,
} from 'src/app/shared/models/exports';
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
      }) as Promise<GraphQLResult<IssuePetition>>
    ).pipe(
      map(({ data }) => ({ result: data })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  newCandidatePetition(
    data: CandidatePetitionInput
  ): Observable<Result<CandidatePetition>> {
    return of({
      result: {
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
        detail: '',
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
        title: 'First name and last name',
        type: PetitionType.ISSUE,
      },
    }).pipe(delay(3000));
  }

  signaturePetition(data: SignaturePetitionData): Observable<Result<string>> {
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
        /**
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
            status: PetitionStatus.ACTIVE,
            title: 'Title1',
            type: PetitionType.ISSUE,
          },
        */
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
          detail: '',
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
          title: 'First name and last name',
          type: PetitionType.ISSUE,
        },
      },
    }).pipe(delay(3000));
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
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            office: '',
            owner: 'CommitteUser-1',
            party: 'Green',
            status: PetitionStatus.NEW,
            title: 'First name and last name',
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
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            title: 'First name and last name',
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
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            title: 'First name and last name',
            type: PetitionType.ISSUE,
          },
        },
      ],
    }).pipe(delay(3000));
  }
}
