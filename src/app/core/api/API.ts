/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TargetPetitionInput = {
  PK: string;
  expectedVersion: number;
};

export type Petition = {
  __typename: 'Petition';
  PK: string;
  createdAt: string;
  owner: string;
  signatureSummary?: SignatureSummary | null;
  status: PetitionStatus;
  type: PetitionType;
  updatedAt: string;
  version: number;
};

export type CandidatePetition = {
  __typename: 'CandidatePetition';
  PK: string;
  address: AddressData;
  createdAt: string;
  name: string;
  office: string;
  owner: string;
  party: string;
  signatureSummary?: SignatureSummary | null;
  status: PetitionStatus;
  type: PetitionType;
  updatedAt: string;
  version: number;
};

export type AddressData = {
  __typename: 'AddressData';
  address: string;
  city?: string | null;
  number?: string | null;
  state: string;
  zipCode?: string | null;
};

export type SignatureSummary = {
  __typename: 'SignatureSummary';
  approved: number;
  deadline?: string | null;
  required: number;
  submitted: number;
};

export enum PetitionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  NEW = 'NEW',
  NOT_QUALIFIED = 'NOT_QUALIFIED',
  QUALIFIED = 'QUALIFIED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum PetitionType {
  CANDIDATE = 'CANDIDATE',
  ISSUE = 'ISSUE',
}

export type IssuePetition = {
  __typename: 'IssuePetition';
  PK: string;
  createdAt: string;
  detail: string;
  owner: string;
  signatureSummary?: SignatureSummary | null;
  status: PetitionStatus;
  title: string;
  type: PetitionType;
  updatedAt: string;
  version: number;
};

export type EditCandidatePetitionInput = {
  PK: string;
  address?: AddressInput | null;
  expectedVersion: number;
  office?: string | null;
  party?: string | null;
};

export type AddressInput = {
  address: string;
  city?: string | null;
  number?: string | null;
  state: string;
  zipCode?: string | null;
};

export type EditIssuePetitionInput = {
  PK: string;
  detail?: string | null;
  expectedVersion: number;
  title?: string | null;
};

export type CandidatePetitionInput = {
  address: AddressInput;
  name: string;
  office: string;
  party: string;
};

export type IssuePetitionInput = {
  detail: string;
  title: string;
};

export type PetitionsByOwnerInput = {
  cursor?: string | null;
  limit?: number | null;
  owner: string;
  status?: PetitionListStatusCheck | null;
};

export enum PetitionListStatusCheck {
  ACTIVE = 'ACTIVE',
  ANY = 'ANY',
  CANCELED = 'CANCELED',
  INACTIVE = 'INACTIVE',
  NEW = 'NEW',
  NOT_QUALIFIED = 'NOT_QUALIFIED',
  QUALIFIED = 'QUALIFIED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export type PetitionConnection = {
  __typename: 'PetitionConnection';
  items: Array<Petition>;
  token?: string | null;
};

export type PetitionsByTypeInput = {
  cursor?: string | null;
  limit?: number | null;
  status?: PetitionListStatusCheck | null;
  type?: PetitionType | null;
};

export type ApprovePetitionMutationVariables = {
  data: TargetPetitionInput;
};

export type ApprovePetitionMutation = {
  approvePetition:
    | (
        | {
            __typename: 'CandidatePetition';
            PK: string;
            createdAt: string;
            owner: string;
            signatureSummary?: {
              __typename: string;
              approved: number;
              deadline?: string | null;
              required: number;
              submitted: number;
            } | null;
            status: PetitionStatus;
            type: PetitionType;
            updatedAt: string;
            version: number;
            address: {
              __typename: string;
              address: string;
              city?: string | null;
              number?: string | null;
              state: string;
              zipCode?: string | null;
            };
            name: string;
            office: string;
            party: string;
          }
        | {
            __typename: 'IssuePetition';
            PK: string;
            createdAt: string;
            owner: string;
            signatureSummary?: {
              __typename: string;
              approved: number;
              deadline?: string | null;
              required: number;
              submitted: number;
            } | null;
            status: PetitionStatus;
            type: PetitionType;
            updatedAt: string;
            version: number;
            detail: string;
            title: string;
          }
      )
    | null;
};

export type EditCandidatePetitionMutationVariables = {
  data: EditCandidatePetitionInput;
};

export type EditCandidatePetitionMutation = {
  editCandidatePetition?: {
    __typename: 'CandidatePetition';
    PK: string;
    address: {
      __typename: 'AddressData';
      address: string;
      city?: string | null;
      number?: string | null;
      state: string;
      zipCode?: string | null;
    };
    createdAt: string;
    name: string;
    office: string;
    owner: string;
    party: string;
    signatureSummary?: {
      __typename: 'SignatureSummary';
      approved: number;
      deadline?: string | null;
      required: number;
      submitted: number;
    } | null;
    status: PetitionStatus;
    type: PetitionType;
    updatedAt: string;
    version: number;
  } | null;
};

export type EditIssuePetitionMutationVariables = {
  data: EditIssuePetitionInput;
};

export type EditIssuePetitionMutation = {
  editIssuePetition?: {
    __typename: 'IssuePetition';
    PK: string;
    createdAt: string;
    detail: string;
    owner: string;
    signatureSummary?: {
      __typename: 'SignatureSummary';
      approved: number;
      deadline?: string | null;
      required: number;
      submitted: number;
    } | null;
    status: PetitionStatus;
    title: string;
    type: PetitionType;
    updatedAt: string;
    version: number;
  } | null;
};

export type RejectPetitionMutationVariables = {
  data: TargetPetitionInput;
};

export type RejectPetitionMutation = {
  rejectPetition:
    | (
        | {
            __typename: 'CandidatePetition';
            PK: string;
            createdAt: string;
            owner: string;
            signatureSummary?: {
              __typename: string;
              approved: number;
              deadline?: string | null;
              required: number;
              submitted: number;
            } | null;
            status: PetitionStatus;
            type: PetitionType;
            updatedAt: string;
            version: number;
            address: {
              __typename: string;
              address: string;
              city?: string | null;
              number?: string | null;
              state: string;
              zipCode?: string | null;
            };
            name: string;
            office: string;
            party: string;
          }
        | {
            __typename: 'IssuePetition';
            PK: string;
            createdAt: string;
            owner: string;
            signatureSummary?: {
              __typename: string;
              approved: number;
              deadline?: string | null;
              required: number;
              submitted: number;
            } | null;
            status: PetitionStatus;
            type: PetitionType;
            updatedAt: string;
            version: number;
            detail: string;
            title: string;
          }
      )
    | null;
};

export type SubmitCandidatePetitionMutationVariables = {
  data: CandidatePetitionInput;
};

export type SubmitCandidatePetitionMutation = {
  submitCandidatePetition: {
    __typename: 'CandidatePetition';
    PK: string;
    address: {
      __typename: 'AddressData';
      address: string;
      city?: string | null;
      number?: string | null;
      state: string;
      zipCode?: string | null;
    };
    createdAt: string;
    name: string;
    office: string;
    owner: string;
    party: string;
    signatureSummary?: {
      __typename: 'SignatureSummary';
      approved: number;
      deadline?: string | null;
      required: number;
      submitted: number;
    } | null;
    status: PetitionStatus;
    type: PetitionType;
    updatedAt: string;
    version: number;
  };
};

export type SubmitIssuePetitionMutationVariables = {
  data: IssuePetitionInput;
};

export type SubmitIssuePetitionMutation = {
  submitIssuePetition: {
    __typename: 'IssuePetition';
    PK: string;
    createdAt: string;
    detail: string;
    owner: string;
    signatureSummary?: {
      __typename: 'SignatureSummary';
      approved: number;
      deadline?: string | null;
      required: number;
      submitted: number;
    } | null;
    status: PetitionStatus;
    title: string;
    type: PetitionType;
    updatedAt: string;
    version: number;
  };
};

export type GetPetitionQueryVariables = {
  PK: string,
};

export type GetPetitionQuery = {
  getPetition: ( {
      __typename: "CandidatePetition",
      PK: string,
      createdAt: string,
      owner: string,
      signatureSummary?:  {
        __typename: string,
        approved: number,
        deadline?: string | null,
        required: number,
        submitted: number,
      } | null,
      status: PetitionStatus,
      type: PetitionType,
      updatedAt: string,
      version: number,
      address:  {
        __typename: string,
        address: string,
        city?: string | null,
        number?: string | null,
        state: string,
        zipCode?: string | null,
      },
      name: string,
      office: string,
      party: string,
    } | {
      __typename: "IssuePetition",
      PK: string,
      createdAt: string,
      owner: string,
      signatureSummary?:  {
        __typename: string,
        approved: number,
        deadline?: string | null,
        required: number,
        submitted: number,
      } | null,
      status: PetitionStatus,
      type: PetitionType,
      updatedAt: string,
      version: number,
      detail: string,
      title: string,
    }
  ) | null,
};

export type GetPetitionsByOwnerQueryVariables = {
  query?: PetitionsByOwnerInput | null;
};

export type GetPetitionsByOwnerQuery = {
  getPetitionsByOwner: {
    __typename: 'PetitionConnection';
    items: Array<
      | {
          __typename: 'CandidatePetition';
          PK: string;
          createdAt: string;
          owner: string;
          signatureSummary?: {
            __typename: string;
            approved: number;
            deadline?: string | null;
            required: number;
            submitted: number;
          } | null;
          status: PetitionStatus;
          type: PetitionType;
          updatedAt: string;
          version: number;
          address: {
            __typename: string;
            address: string;
            city?: string | null;
            number?: string | null;
            state: string;
            zipCode?: string | null;
          };
          name: string;
          office: string;
          party: string;
        }
      | {
          __typename: 'IssuePetition';
          PK: string;
          createdAt: string;
          owner: string;
          signatureSummary?: {
            __typename: string;
            approved: number;
            deadline?: string | null;
            required: number;
            submitted: number;
          } | null;
          status: PetitionStatus;
          type: PetitionType;
          updatedAt: string;
          version: number;
          detail: string;
          title: string;
        }
    >;
    token?: string | null;
  };
};

export type GetPetitionsByTypeQueryVariables = {
  query?: PetitionsByTypeInput | null;
};

export type GetPetitionsByTypeQuery = {
  getPetitionsByType: {
    __typename: 'PetitionConnection';
    items: Array<
      | {
          __typename: 'CandidatePetition';
          PK: string;
          createdAt: string;
          owner: string;
          signatureSummary?: {
            __typename: string;
            approved: number;
            deadline?: string | null;
            required: number;
            submitted: number;
          } | null;
          status: PetitionStatus;
          type: PetitionType;
          updatedAt: string;
          version: number;
          address: {
            __typename: string;
            address: string;
            city?: string | null;
            number?: string | null;
            state: string;
            zipCode?: string | null;
          };
          name: string;
          office: string;
          party: string;
        }
      | {
          __typename: 'IssuePetition';
          PK: string;
          createdAt: string;
          owner: string;
          signatureSummary?: {
            __typename: string;
            approved: number;
            deadline?: string | null;
            required: number;
            submitted: number;
          } | null;
          status: PetitionStatus;
          type: PetitionType;
          updatedAt: string;
          version: number;
          detail: string;
          title: string;
        }
    >;
    token?: string | null;
  };
};

export type PublicEchoQueryVariables = {
  ping: string;
};

export type PublicEchoQuery = {
  publicEcho: string;
};
