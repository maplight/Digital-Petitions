import { TestBed } from '@angular/core/testing';
import { API } from 'aws-amplify';
import {
  ApproveSignatureMutation,
  GetSignaturesByPetitionQuery,
  RejectSignatureMutation,
  Signature,
  SignatureStatus,
  VerificationMethod,
} from 'src/app/core/api/API';

import { SignatureService } from './signature.service';

describe('SignatureService', () => {
  let service: SignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getSignatures
  it('getSignatures should return a SignatureConnection object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getSignaturesByPetitionQuery });
      })
    );
    service.getSignatures({ petition: '' }).subscribe((data) => {
      expect(data.result).toEqual({
        __typename: 'SignatureConnection',
        items: [],
        token: undefined,
      });
      done();
    });
  });

  it('getSignatures should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.getSignatures({ petition: '' }).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //approveSignature
  it('approveSignature should return a string value when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: approve });
      })
    );
    service.approveSignature({ signatureId: '0' }).subscribe((data) => {
      expect(data.result).toEqual(_signature);
      done();
    });
  });

  //denySignature
  it('denySignature should return a string value when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: deny });
      })
    );
    service.denySignature({ signatureId: '0' }).subscribe((data) => {
      expect(data.result).toEqual(_signature);
      done();
    });
  });
});

const _getSignaturesByPetitionQuery: GetSignaturesByPetitionQuery = {
  getSignaturesByPetition: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
};
const _signature: Signature = {
  __typename: 'Signature',
  PK: '',
  address: '',
  createdAt: '',
  isVerified: false,
  method: VerificationMethod.CALL,
  name: '',
  signer: '',
  status: SignatureStatus.APPROVED,
  updatedAt: '',
};
const approve: ApproveSignatureMutation = {
  approveSignature: _signature,
};

const deny: RejectSignatureMutation = {
  rejectSignature: _signature,
};
