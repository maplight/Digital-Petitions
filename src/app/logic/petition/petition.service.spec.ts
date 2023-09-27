import { TestBed } from '@angular/core/testing';
import { API } from 'aws-amplify';
import {
  ApprovePetitionMutation,
  CandidatePetition,
  EditCandidatePetitionMutation,
  EditIssuePetitionMutation,
  GetPetitionQuery,
  GetPetitionsByOwnerQuery,
  GetPetitionsByTypeQuery,
  GetVoterRecordMatchQuery,
  IssuePetition,
  PetitionStatus,
  PetitionType,
  RejectPetitionMutation,
  SubmitCandidatePetitionMutation,
  SubmitIssuePetitionMutation,
  SubmitSignatureMutation,
  SubmitVerificationCodeMutation,
  VerificationMethod,
} from 'src/app/core/api/API';

import { PetitionService } from './petition.service';

describe('PetitionService', () => {
  let service: PetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('newIssuePetition should return a IssuePetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _submitIssuePetitionMutation });
      }),
    );
    service.newIssuePetition({ detail: '', title: '' }).subscribe((data) => {
      expect(data.result).toEqual(_issuePetition);
      done();
    });
  });

  it('newIssuePetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.newIssuePetition({ detail: '', title: '' }).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('newCandidatePetition should return a IssuePetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _submitCandidatePetitionMutation });
      }),
    );
    service
      .newCandidatePetition({
        address: { address: '', state: '' },
        name: '',
        office: '',
        party: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual(_candidatePetition);
        done();
      });
  });

  it('newCandidatePetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .newCandidatePetition({
        address: { address: '', state: '' },
        name: '',
        office: '',
        party: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('signPetition should return a SignatureVerification object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _submitSignatureMutation });
      }),
    );
    service
      .signPetition({
        address: '',
        city: '',
        fullName: '',
        method: VerificationMethod.CALL,
        methodPayload: [],
        state: '',
        token: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual({
          __typename: 'SignatureVerification',
          address: '',
          city: '',
          confirmationRequired: false,
          error: undefined,
          fullName: '',
          id: undefined,
          method: VerificationMethod.CALL,
          methodPayload: [],
          state: '',
          title: undefined,
          token: '',
          zipCode: '',
        });
        done();
      });
  });

  it('signPetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .signPetition({
        address: '',
        city: '',
        fullName: '',
        method: VerificationMethod.CALL,
        methodPayload: [],
        state: '',
        token: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('getVoterRecordMatch should return a VoterRecordMatch object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getVoterRecordMatchQuery });
      }),
    );
    service
      .getVoterRecordMatch({
        address: '',
        city: '',
        fullName: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual({
          __typename: 'VoterRecordMatch',
          address: '',
          city: '',
          fullName: '',
          methods: [],
          state: '',
          token: undefined,
          zipCode: '',
        });
        done();
      });
  });

  it('getVoterRecordMatch should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .getVoterRecordMatch({
        address: '',
        city: '',
        fullName: '',
        state: '',
        zipCode: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('confirmSignaturePetition should return a CodeSubmissionResult object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _submitVerificationCodeMutation });
      }),
    );
    service.confirmSignaturePetition('').subscribe((data) => {
      expect(data.result).toEqual(
        _submitVerificationCodeMutation.submitVerificationCode,
      );
      done();
    });
  });

  it('confirmSignaturePetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.confirmSignaturePetition('').subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('editPetitionIssue should return a IssuePetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _editIssuePetitionMutation });
      }),
    );
    service
      .editPetitionIssue({ expectedVersion: 0, PK: '' })
      .subscribe((data) => {
        expect(data.result).toEqual(_issuePetition);
        done();
      });
  });

  it('editPetitionIssue should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .editPetitionIssue({ expectedVersion: 0, PK: '' })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('editPetitionCandidate should return a CandidatePetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _editCandidatePetitionMutation });
      }),
    );
    service
      .editPetitionCandidate({ expectedVersion: 0, PK: '' })
      .subscribe((data) => {
        expect(data.result).toEqual(_candidatePetition);
        done();
      });
  });

  it('editPetitionCandidate should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .editPetitionCandidate({ expectedVersion: 0, PK: '' })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('getPublicPetition should return a IssuePetition object when the promise it succesful resolve (the response data it a issue petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryIssue });
      }),
    );
    service.getPublicPetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataIssue: _issuePetition });
      done();
    });
  });

  it('getPublicPetition should return a CandidatePetition object when the promise it succesful resolve (the response data it a candidate petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryCandidate });
      }),
    );
    service.getPublicPetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataCandidate: _candidatePetition });
      done();
    });
  });

  it('getPublicPetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getPublicPetition('').subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getCommitteePetition should return a IssuePetition object when the promise it succesful resolve (the response data it a issue petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryIssue });
      }),
    );
    service.getCommitteePetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataIssue: _issuePetition });
      done();
    });
  });

  it('getCommitteePetition should return a CandidatePetition object when the promise it succesful resolve (the response data it a candidate petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryCandidate });
      }),
    );
    service.getCommitteePetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataCandidate: _candidatePetition });
      done();
    });
  });

  it('getCommitteePetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getCommitteePetition('').subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getStaffPetition should return a IssuePetition object when the promise it succesful resolve (the response data it a issue petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryIssue });
      }),
    );
    service.getStaffPetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataIssue: _issuePetition });
      done();
    });
  });

  it('getStaffPetition should return a CandidatePetition object when the promise it succesful resolve (the response data it a candidate petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionQueryCandidate });
      }),
    );
    service.getStaffPetition('').subscribe((data) => {
      expect(data.result).toEqual({ dataCandidate: _candidatePetition });
      done();
    });
  });

  it('getStaffPetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getStaffPetition('').subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('approvePetition should return a IssuePetition object when the promise it succesful resolve (the response data it a issue petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _approveIssuePetitionMutation });
      }),
    );
    service
      .approvePetition({
        deadline: '',
        expectedVersion: 0,
        PK: '',
        requiredSignatures: 0,
      })
      .subscribe((data) => {
        expect(data.result).toEqual({ dataIssue: _issuePetition });
        done();
      });
  });

  it('approvePetition should return a CandidatePetition object when the promise it succesful resolve (the response data it a candidate petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _approveCandidatePetitionMutation });
      }),
    );
    service
      .approvePetition({
        deadline: '',
        expectedVersion: 0,
        PK: '',
        requiredSignatures: 0,
      })
      .subscribe((data) => {
        expect(data.result).toEqual({ dataCandidate: _candidatePetition });
        done();
      });
  });

  it('approvePetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .approvePetition({
        deadline: '',
        expectedVersion: 0,
        PK: '',
        requiredSignatures: 0,
      })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('denyPetition should return a IssuePetition object when the promise it succesful resolve (the response data it a issue petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _rejectIssuePetitionMutation });
      }),
    );
    service
      .denyPetition({
        expectedVersion: 0,
        PK: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual({ dataIssue: _issuePetition });
        done();
      });
  });

  it('denyPetition should return a CandidatePetition object when the promise it succesful resolve (the response data it a candidate petition)', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _rejectCandidatePetitionMutation });
      }),
    );
    service
      .denyPetition({
        expectedVersion: 0,
        PK: '',
      })
      .subscribe((data) => {
        expect(data.result).toEqual({ dataCandidate: _candidatePetition });
        done();
      });
  });

  it('denyPetition should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service
      .denyPetition({
        expectedVersion: 0,
        PK: '',
      })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  it('getCommitteePetitions should return a BufferPetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionsByOwnerQuery });
      }),
    );
    service.getCommitteePetitions({ owner: '' }).subscribe((data) => {
      expect(data.result).toEqual({
        items: [
          { dataIssue: _issuePetition },
          { dataCandidate: _candidatePetition },
        ],
        cursor: undefined,
      });
      done();
    });
  });

  it('getCommitteePetitions should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getCommitteePetitions({ owner: '' }).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getInactivePetitions should return a BufferPetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionsByTypeQuery });
      }),
    );
    service.getInactivePetitions({}).subscribe((data) => {
      expect(data.result).toEqual({
        items: [
          { dataIssue: _issuePetition },
          { dataCandidate: _candidatePetition },
        ],
        cursor: undefined,
      });
      done();
    });
  });

  it('getInactivePetitions should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getInactivePetitions({}).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getCityStaffPetitions should return a BufferPetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionsByTypeQuery });
      }),
    );
    service.getCityStaffPetitions({}).subscribe((data) => {
      expect(data.result).toEqual({
        items: [
          { dataIssue: _issuePetition },
          { dataCandidate: _candidatePetition },
        ],
        cursor: undefined,
      });
      done();
    });
  });

  it('getCityStaffPetitions should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getCityStaffPetitions({}).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getActivePetitions should return a BufferPetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionsByTypeQuery });
      }),
    );
    service.getActivePetitions({}).subscribe((data) => {
      expect(data.result).toEqual({
        items: [
          { dataIssue: _issuePetition },
          { dataCandidate: _candidatePetition },
        ],
        cursor: undefined,
      });
      done();
    });
  });

  it('getActivePetitions should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getActivePetitions({}).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getAnonymousActivePetitions should return a BufferPetition object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getPetitionsByTypeQuery });
      }),
    );
    service.getAnonymousActivePetitions({}).subscribe((data) => {
      expect(data.result).toEqual({
        items: [
          { dataIssue: _issuePetition },
          { dataCandidate: _candidatePetition },
        ],
        cursor: undefined,
      });
      done();
    });
  });

  it('getAnonymousActivePetitions should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      }),
    );

    service.getAnonymousActivePetitions({}).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  it('getAnonymousActivePetitions should return a error message when the promise it rejected', (done) => {
    service.withdrawPetition(0).subscribe((data) => {
      expect(data.result).toEqual('SUCCESS');
      done();
    });
  });
});

const _issuePetition: IssuePetition = {
  __typename: 'IssuePetition',
  PK: '',
  createdAt: '',
  detail: '',
  owner: '',
  signatureSummary: undefined,
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.ACTIVE,
  title: '',
  type: PetitionType.ISSUE,
  updatedAt: '',
  version: 0,
};

const _candidatePetition: CandidatePetition = {
  __typename: 'CandidatePetition',
  PK: '',
  address: {
    __typename: 'AddressData',
    address: '',
    city: undefined,
    number: undefined,
    state: '',
    zipCode: undefined,
  },
  createdAt: '',
  name: '',
  office: '',
  owner: '',
  party: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.ACTIVE,
  type: PetitionType.CANDIDATE,
  updatedAt: '',
  version: 0,
};

const _submitIssuePetitionMutation: SubmitIssuePetitionMutation = {
  submitIssuePetition: _issuePetition,
};

const _submitCandidatePetitionMutation: SubmitCandidatePetitionMutation = {
  submitCandidatePetition: _candidatePetition,
};

const _submitSignatureMutation: SubmitSignatureMutation = {
  submitSignature: {
    __typename: 'SignatureVerification',
    address: '',
    city: '',
    confirmationRequired: false,
    error: undefined,
    fullName: '',
    id: undefined,
    method: VerificationMethod.CALL,
    methodPayload: [],
    state: '',
    title: undefined,
    token: '',
    zipCode: '',
  },
};

const _getVoterRecordMatchQuery: GetVoterRecordMatchQuery = {
  getVoterRecordMatch: {
    __typename: 'VoterRecordMatch',
    address: '',
    city: '',
    fullName: '',
    methods: [],
    state: '',
    token: undefined,
    zipCode: '',
  },
};

const _submitVerificationCodeMutation: SubmitVerificationCodeMutation = {
  submitVerificationCode: {
    __typename: 'CodeSubmissionResult',
    id: '12345',
    title: '',
    error: null,
  },
};

const _editIssuePetitionMutation: EditIssuePetitionMutation = {
  editIssuePetition: _issuePetition,
};

const _editCandidatePetitionMutation: EditCandidatePetitionMutation = {
  editCandidatePetition: _candidatePetition,
};

const _getPetitionQueryIssue: GetPetitionQuery = {
  getPetition: _issuePetition,
};

const _getPetitionQueryCandidate: GetPetitionQuery = {
  getPetition: _candidatePetition,
};

const _approveIssuePetitionMutation: ApprovePetitionMutation = {
  approvePetition: _issuePetition,
};

const _approveCandidatePetitionMutation: ApprovePetitionMutation = {
  approvePetition: _candidatePetition,
};

const _rejectIssuePetitionMutation: RejectPetitionMutation = {
  rejectPetition: _issuePetition,
};

const _rejectCandidatePetitionMutation: RejectPetitionMutation = {
  rejectPetition: _candidatePetition,
};

const _getPetitionsByOwnerQuery: GetPetitionsByOwnerQuery = {
  getPetitionsByOwner: {
    __typename: 'PetitionConnection',
    items: [_issuePetition, _candidatePetition],
    token: undefined,
  },
};

const _getPetitionsByTypeQuery: GetPetitionsByTypeQuery = {
  getPetitionsByType: {
    __typename: 'PetitionConnection',
    items: [_issuePetition, _candidatePetition],
    token: undefined,
  },
};
