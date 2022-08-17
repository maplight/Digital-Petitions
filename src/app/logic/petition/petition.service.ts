import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  CandidatePetitionData,
  FilterData,
  IssuePetitionData,
  Result,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

@Injectable({ providedIn: 'root' })
export class PetitionService {
  constructor() {}

  newPetitionIssue(
    data: IssuePetitionData
  ): Observable<Result<IssuePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
  }

  signPetition(data: SignaturePetitionData): Observable<Result<string>> {
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
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            text: 'Text2',
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
            text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            text: 'Text2',
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
            text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
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
            text: 'Text2',
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
