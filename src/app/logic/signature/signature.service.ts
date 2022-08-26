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
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
        },
        {
          id: '0',
          address: 'Address',
          email: 'fulano@asd.a',
          registered: 'Registered',
          selected: false,
          signer_date: '00/00/0000',
          signer_name: 'Some people',
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
