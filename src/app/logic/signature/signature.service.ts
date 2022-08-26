import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FilterData, Result } from 'src/app/shared/models/exports';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  constructor() {}

  getSignatures(data: FilterData[]): Observable<Result<SignaturesData[]>> {
    return of({
      result: [
        {
          id: '0',
          address: 'Address1',
          email: 'fulano@asd.a2',
          registered: 'Registered3',
          selected: false,
          signer_date: '04/00/0000',
          signer_name: 'Some people5',
        },
        {
          id: '0',
          address: 'Address2',
          email: 'fulano@asd.a3',
          registered: 'Registered4',
          selected: false,
          signer_date: '05/00/0000',
          signer_name: 'Some people1',
        },
        {
          id: '0',
          address: 'Address3',
          email: 'fulano@asd.a4',
          registered: 'Registered5',
          selected: false,
          signer_date: '01/00/0000',
          signer_name: 'Some people2',
        },
        {
          id: '0',
          address: 'Address4',
          email: 'fulano@asd.a5',
          registered: 'Registered1',
          selected: false,
          signer_date: '02/00/0000',
          signer_name: 'Some people3',
        },
        {
          id: '0',
          address: 'Address5',
          email: 'fulano@asd.a1',
          registered: 'Registered2',
          selected: false,
          signer_date: '03/00/0000',
          signer_name: 'Some people4',
        },
      ],
    }).pipe(delay(3000));
  }
  approveSignature(id: string[]): Observable<Result<string>> {
    return of({
      result: id.length.toString(),
    }).pipe(delay(3000));
  }
  denySignature(id: string[]): Observable<Result<string>> {
    return of({
      result: id.length.toString(),
    }).pipe(delay(3000));
  }
}
