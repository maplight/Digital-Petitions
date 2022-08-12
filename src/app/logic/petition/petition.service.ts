import { Injectable } from '@angular/core';
import API, { GraphQLResult } from '@aws-amplify/api';
import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import { IssuePetition, IssuePetitionInput } from 'src/app/core/api/API';
import {
  CandidatePetitionData,
  FilterData,
  IssuePetitionData,
  Result,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

import { submitIssuePetition } from 'src/graphql/mutations';

@Injectable({ providedIn: 'root' })
export class PetitionService {
  constructor() {}

  newIssuePetition(
    data: IssuePetitionInput
  ): Observable<Result<IssuePetition>> {
    return from(
      API.graphql({
        query: submitIssuePetition,
        variables: { data: { ...data, id: 'pasta' } },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<IssuePetition>>
    ).pipe(
      map(({ data }) => ({ result: data })),
      catchError((error) => of({ error: error?.[0]?.message }))
    );
  }

  signaturePetition(data: SignaturePetitionData): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }
  confirmSignaturePetition(data: string): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  newPetitionCandidate(
    data: CandidatePetitionData
  ): Observable<Result<CandidatePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
  }
  editPetitionIssue(
    data: IssuePetitionData
  ): Observable<Result<IssuePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
  }

  editPetitionCandidate(
    data: CandidatePetitionData
  ): Observable<Result<CandidatePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
  }

  getPetition(data: number): Observable<Result<ResponsePetition>> {
    return of({
      result: {
        dataIssue: {
          id: 0,
          title: 'Title1',
          detail:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
          atributes: {
            type: 'Issue',
            status: 'passed',
            currentSign: 10000,
            verifiedSign: 1000,
            totalSign: 30000,
            deadline: '01/01/2023',
          },
        },
      },
    }).pipe(delay(3000));
  }

  withdrawPetition(data: number): Observable<Result<string>> {
    return of({ result: 'SUCCESS' }).pipe(delay(3000));
  }

  getCandidatePetitions(
    filter: FilterData[]
  ): Observable<Result<ResponsePetition[]>> {
    return of({
      result: [
        {
          dataIssue: {
            id: 0,
            title: 'Title1',
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            atributes: {
              type: 'Issue',
              status: 'new',
              currentSign: 10000,
              totalSign: 30000,
            },
          },
        },
        {
          dataIssue: {
            id: 0,
            title: 'Title2',
            detail: 'Text2',
            atributes: {
              type: 'Issue',
              status: 'new',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
        {
          dataCandidate: {
            id: 0,
            address: 'Address',
            aptNumber: '14',
            city: 'City',
            fullName: 'Denismay Concepcion Rosa',
            office: 'Office',
            party: 'Party',
            state: { name: 'Alaska', value: 'AL' },
            zipCode: '00000',
            atributes: {
              type: 'Candidate',
              status: 'new',
              currentSign: 20000,
              totalSign: 30000,
            },
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
            id: 0,
            title: 'Title1',
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            atributes: {
              type: 'Issue',
              status: 'pased',
              currentSign: 10000,
              totalSign: 30000,
            },
          },
        },
        {
          dataIssue: {
            id: 0,
            title: 'Title2',
            detail: 'Text2',
            atributes: {
              type: 'Issue',
              status: 'failed',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
        {
          dataCandidate: {
            id: 0,
            address: 'Address',
            aptNumber: '14',
            city: 'City',
            fullName: 'Denismay Concepcion Rosa',
            office: 'Office',
            party: 'Party',
            state: { name: 'Alaska', value: 'AL' },
            zipCode: '00000',
            atributes: {
              type: 'Candidate',
              status: 'pased',
              currentSign: 20000,
              totalSign: 30000,
            },
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
            id: 0,
            title: 'Title1',
            detail:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            atributes: {
              type: 'Issue',
              status: 'open',
              currentSign: 10000,
              totalSign: 30000,
            },
          },
        },
        {
          dataIssue: {
            id: 0,
            title: 'Title2',
            detail: 'Text2',
            atributes: {
              type: 'Issue',
              status: 'open',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
        {
          dataCandidate: {
            id: 0,
            address: 'Address',
            aptNumber: '14',
            city: 'City',
            fullName: 'Denismay Concepcion Rosa',
            office: 'Office',
            party: 'Party',
            state: { name: 'Alaska', value: 'AL' },
            zipCode: '00000',
            atributes: {
              type: 'Candidate',
              status: 'open',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
      ],
    }).pipe(delay(3000));
  }
}
