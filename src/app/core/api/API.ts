/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CandidatePetitionInput = {
  address: AddressInput,
  name: string,
  office: string,
  party: string,
};

export type AddressInput = {
  address: string,
  city?: string | null,
  number?: string | null,
  state: string,
  zipCode?: string | null,
};

export type CandidatePetition = {
  __typename: "CandidatePetition",
  PK: string,
  address: AddressData,
  createdAt: string,
  name: string,
  office: string,
  owner: string,
  party: string,
  signatureSummary?: SignatureSummary | null,
  status: PetitionStatus,
  type: PetitionType,
};

export type Petition = {
  __typename: "Petition",
  PK: string,
  createdAt: string,
  owner: string,
  signatureSummary?: SignatureSummary | null,
  status: PetitionStatus,
  type: PetitionType,
};

export type IssuePetition = {
  __typename: "IssuePetition",
  PK: string,
  createdAt: string,
  detail: string,
  owner: string,
  signatureSummary?: SignatureSummary | null,
  status: PetitionStatus,
  title: string,
  type: PetitionType,
};

export type SignatureSummary = {
  __typename: "SignatureSummary",
  approved: number,
  deadline?: string | null,
  required: number,
  submitted: number,
};

export enum PetitionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  NEW = "NEW",
  QUALIFIED = "QUALIFIED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export enum PetitionType {
  CANDIDATE = "CANDIDATE",
  ISSUE = "ISSUE",
}


export type AddressData = {
  __typename: "AddressData",
  address: string,
  city?: string | null,
  number?: string | null,
  state: string,
  zipCode?: string | null,
};

export type IssuePetitionInput = {
  detail: string,
  title: string,
};

export type SubmitCandidatePetitionMutationVariables = {
  data: CandidatePetitionInput,
};

export type SubmitCandidatePetitionMutation = {
  submitCandidatePetition:  {
    __typename: "CandidatePetition",
    PK: string,
    address:  {
      __typename: "AddressData",
      address: string,
      city?: string | null,
      number?: string | null,
      state: string,
      zipCode?: string | null,
    },
    createdAt: string,
    name: string,
    office: string,
    owner: string,
    party: string,
    signatureSummary?:  {
      __typename: "SignatureSummary",
      approved: number,
      deadline?: string | null,
      required: number,
      submitted: number,
    } | null,
    status: PetitionStatus,
    type: PetitionType,
  },
};

export type SubmitIssuePetitionMutationVariables = {
  data: IssuePetitionInput,
};

export type SubmitIssuePetitionMutation = {
  submitIssuePetition:  {
    __typename: "IssuePetition",
    PK: string,
    createdAt: string,
    detail: string,
    owner: string,
    signatureSummary?:  {
      __typename: "SignatureSummary",
      approved: number,
      deadline?: string | null,
      required: number,
      submitted: number,
    } | null,
    status: PetitionStatus,
    title: string,
    type: PetitionType,
  },
};

export type PublicEchoQueryVariables = {
  ping: string,
};

export type PublicEchoQuery = {
  publicEcho: string,
};
