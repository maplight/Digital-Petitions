import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  CandidatePetitionData,
  IssuePetitionData,
  Result,
} from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Injectable({
  providedIn: 'root',
})
export class PetitionService {
  constructor() {}

  newPetitionIssue(
    data: IssuePetitionData
  ): Observable<Result<IssuePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
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
    return of({ result: { dataIssue: { title: 'Title', text: 'Text' } } }).pipe(
      delay(3000)
    );
  }
  getPetitions(): Observable<Result<ResponsePetition[]>> {
    return of({
      result: [
        {
          dataIssue: {
            title: 'Title1',
            text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
            atributes: {
              type: 'Issue',
              status: 'Awaiting Approval',
              currentSign: 10000,
              totalSign: 30000,
            },
          },
        },
        {
          dataIssue: {
            title: 'Title2',
            text: 'Text2',
            atributes: {
              type: 'Issue',
              status: 'Awaiting Approval',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
        {
          dataCandidate: {
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
              status: 'Awaiting Approval',
              currentSign: 20000,
              totalSign: 30000,
            },
          },
        },
      ],
    }).pipe(delay(3000));
  }
}
