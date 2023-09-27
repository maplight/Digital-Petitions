/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ApprovePetitionInput = {
  PK: string;
  deadline: string;
  expectedVersion: number;
  requiredSignatures: number;
};

export type Petition = {
  __typename: 'Petition';
  PK: string;
  createdAt: string;
  owner: string;
  signatureSummary?: SignatureSummary | null;
  signatures: SignatureConnection;
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
  signatures: SignatureConnection;
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
  approved?: number | null;
  deadline?: string | null;
  rejected?: number | null;
  required?: number | null;
  submitted?: number | null;
  verified?: number | null;
};

export type SignatureConnection = {
  __typename: 'SignatureConnection';
  items: Array<Signature>;
  token?: string | null;
};

export type Signature = {
  __typename: 'Signature';
  PK: string;
  address: string;
  createdAt: string;
  isVerified: boolean;
  method: VerificationMethod;
  name: string;
  signer: string;
  status: SignatureStatus;
  updatedAt: string;
  verifiedAt?: string | null;
};

export enum VerificationMethod {
  CALL = 'CALL',
  EMAIL = 'EMAIL',
  POSTAL = 'POSTAL',
  STATE_ID = 'STATE_ID',
  TEXT = 'TEXT',
}

export enum SignatureStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
}

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
  signatures: SignatureConnection;
  status: PetitionStatus;
  title: string;
  type: PetitionType;
  updatedAt: string;
  version: number;
};

export type TargetSignatureInput = {
  signatureId: string;
};

export type StaffUserInput = {
  email: string;
  permissions: StaffAccessLevel;
};

export enum StaffAccessLevel {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  STAFF = 'STAFF',
}

export type User = {
  __typename: 'User';
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  permissions: AccessLevel;
  username: string;
};

export enum AccessLevel {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  NONE = 'NONE',
  PETITIONER = 'PETITIONER',
  STAFF = 'STAFF',
}

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

export type TargetPetitionInput = {
  PK: string;
  expectedVersion: number;
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

export type SignatureVerificationInput = {
  address: string;
  city: string;
  fullName: string;
  id?: string | null;
  method: VerificationMethod;
  methodPayload: Array<string | null>;
  state: string;
  title?: string | null;
  token: string;
  zipCode: string;
};

export type SignatureVerification = {
  __typename: 'SignatureVerification';
  address: string;
  city: string;
  confirmationRequired: boolean;
  error?: string | null;
  fullName: string;
  id?: string | null;
  method: VerificationMethod;
  methodPayload: Array<string | null>;
  state: string;
  title?: string | null;
  token: string;
  zipCode: string;
};

export type CodeSubmissionResult = {
  __typename: 'CodeSubmissionResult';
  id?: string | null;
  title?: string | null;
  error?: string | null;
};

export type SiteConfigurationInput = {
  buttonColor?: string | null;
  expectedVersion: number;
  headerColor?: string | null;
  highlightColor?: string | null;
  logoImage?: string | null;
};

export type SiteConfiguration = {
  __typename: 'SiteConfiguration';
  buttonColor?: string | null;
  headerColor?: string | null;
  highlightColor?: string | null;
  logoImage?: string | null;
  version: number;
};

export type UpdateUserAccessInput = {
  permissions: AccessLevel;
  username: string;
};

export type PetitionsByOwnerInput = {
  cursor?: string | null;
  limit?: number | null;
  owner: string;
  status?: PetitionStatusQuery | null;
};

export enum PetitionStatusQuery {
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
  status?: PetitionStatusQuery | null;
  type?: PetitionType | null;
};

export type GetResourceUploadURLInput = {
  type: AssetType;
};

export enum AssetType {
  LOGO = 'LOGO',
}

export type GetResourceVersionInput = {
  type: AssetType;
};

export type SignaturesByPetitionInput = {
  cursor?: string | null;
  limit?: number | null;
  petition: string;
  status?: SignatureStatusQuery | null;
};

export enum SignatureStatusQuery {
  ANY = 'ANY',
  APPROVED = 'APPROVED',
  APPROVED_AND_VERIFIED = 'APPROVED_AND_VERIFIED',
  APPROVED_VERIFICATION_PENDING = 'APPROVED_VERIFICATION_PENDING',
  REJECTED = 'REJECTED',
  REJECTED_AND_VERIFIED = 'REJECTED_AND_VERIFIED',
  REJECTED_VERIFICATION_PENDING = 'REJECTED_VERIFICATION_PENDING',
  SUBMITTED = 'SUBMITTED',
  VERIFICATION_PENDING = 'VERIFICATION_PENDING',
  VERIFIED = 'VERIFIED',
}

export type ListResourcesInput = {
  cursor?: string | null;
  limit?: number | null;
  type: AssetType;
};

export type ResourceConnection = {
  __typename: 'ResourceConnection';
  items: Array<string>;
  token?: string | null;
};

export type SearchUsersInput = {
  cursor?: string | null;
  limit?: number | null;
  searchEmail?: string | null;
  searchGroup?: AccessLevelQuery | null;
  searchName?: string | null;
};

export enum AccessLevelQuery {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  PETITIONER = 'PETITIONER',
  STAFF = 'STAFF',
}

export type UserConnection = {
  __typename: 'UserConnection';
  items: Array<User>;
  token?: string | null;
};

export type VoterRecordMatchInput = {
  address: string;
  city: string;
  fullName: string;
  state: string;
  zipCode: string;
};

export type VoterRecordMatch = {
  __typename: 'VoterRecordMatch';
  address: string;
  city: string;
  fullName: string;
  methods: Array<string>;
  state: string;
  token?: string | null;
  zipCode: string;
};

export type ApprovePetitionMutationVariables = {
  data: ApprovePetitionInput;
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
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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

export type ApproveSignatureMutationVariables = {
  data: TargetSignatureInput;
};

export type ApproveSignatureMutation = {
  approveSignature?: {
    __typename: 'Signature';
    PK: string;
    address: string;
    createdAt: string;
    isVerified: boolean;
    method: VerificationMethod;
    name: string;
    signer: string;
    status: SignatureStatus;
    updatedAt: string;
    verifiedAt?: string | null;
  } | null;
};

export type CreateStaffUserMutationVariables = {
  data: StaffUserInput;
};

export type CreateStaffUserMutation = {
  createStaffUser: {
    __typename: 'User';
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    permissions: AccessLevel;
    username: string;
  };
};

export type DeleteStaffUserMutationVariables = {
  username: string;
};

export type DeleteStaffUserMutation = {
  deleteStaffUser: boolean;
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
      approved?: number | null;
      deadline?: string | null;
      rejected?: number | null;
      required?: number | null;
      submitted?: number | null;
      verified?: number | null;
    } | null;
    signatures: {
      __typename: 'SignatureConnection';
      items: Array<{
        __typename: 'Signature';
        PK: string;
        address: string;
        createdAt: string;
        isVerified: boolean;
        method: VerificationMethod;
        name: string;
        signer: string;
        status: SignatureStatus;
        updatedAt: string;
        verifiedAt?: string | null;
      }>;
      token?: string | null;
    };
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
      approved?: number | null;
      deadline?: string | null;
      rejected?: number | null;
      required?: number | null;
      submitted?: number | null;
      verified?: number | null;
    } | null;
    signatures: {
      __typename: 'SignatureConnection';
      items: Array<{
        __typename: 'Signature';
        PK: string;
        address: string;
        createdAt: string;
        isVerified: boolean;
        method: VerificationMethod;
        name: string;
        signer: string;
        status: SignatureStatus;
        updatedAt: string;
        verifiedAt?: string | null;
      }>;
      token?: string | null;
    };
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
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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

export type RejectSignatureMutationVariables = {
  data: TargetSignatureInput;
};

export type RejectSignatureMutation = {
  rejectSignature?: {
    __typename: 'Signature';
    PK: string;
    address: string;
    createdAt: string;
    isVerified: boolean;
    method: VerificationMethod;
    name: string;
    signer: string;
    status: SignatureStatus;
    updatedAt: string;
    verifiedAt?: string | null;
  } | null;
};

export type RequestUserVerificationCodeResendMutationVariables = {
  email: string;
};

export type RequestUserVerificationCodeResendMutation = {
  requestUserVerificationCodeResend: boolean;
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
      approved?: number | null;
      deadline?: string | null;
      rejected?: number | null;
      required?: number | null;
      submitted?: number | null;
      verified?: number | null;
    } | null;
    signatures: {
      __typename: 'SignatureConnection';
      items: Array<{
        __typename: 'Signature';
        PK: string;
        address: string;
        createdAt: string;
        isVerified: boolean;
        method: VerificationMethod;
        name: string;
        signer: string;
        status: SignatureStatus;
        updatedAt: string;
        verifiedAt?: string | null;
      }>;
      token?: string | null;
    };
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
      approved?: number | null;
      deadline?: string | null;
      rejected?: number | null;
      required?: number | null;
      submitted?: number | null;
      verified?: number | null;
    } | null;
    signatures: {
      __typename: 'SignatureConnection';
      items: Array<{
        __typename: 'Signature';
        PK: string;
        address: string;
        createdAt: string;
        isVerified: boolean;
        method: VerificationMethod;
        name: string;
        signer: string;
        status: SignatureStatus;
        updatedAt: string;
        verifiedAt?: string | null;
      }>;
      token?: string | null;
    };
    status: PetitionStatus;
    title: string;
    type: PetitionType;
    updatedAt: string;
    version: number;
  };
};

export type SubmitSignatureMutationVariables = {
  data: SignatureVerificationInput;
};

export type SubmitSignatureMutation = {
  submitSignature: {
    __typename: 'SignatureVerification';
    address: string;
    city: string;
    confirmationRequired: boolean;
    error?: string | null;
    fullName: string;
    id?: string | null;
    method: VerificationMethod;
    methodPayload: Array<string | null>;
    state: string;
    title?: string | null;
    token: string;
    zipCode: string;
  };
};

export type SubmitVerificationCodeMutationVariables = {
  code: string;
};

export type SubmitVerificationCodeMutation = {
  submitVerificationCode: {
    __typename: 'CodeSubmissionResult';
    id?: string | null;
    title?: string | null;
    error?: string | null;
  };
};

export type UpdateSiteConfigurationMutationVariables = {
  data: SiteConfigurationInput;
};

export type UpdateSiteConfigurationMutation = {
  updateSiteConfiguration: {
    __typename: 'SiteConfiguration';
    buttonColor?: string | null;
    headerColor?: string | null;
    highlightColor?: string | null;
    logoImage?: string | null;
    version: number;
  };
};

export type UpdateUserAccessMutationVariables = {
  data: UpdateUserAccessInput;
};

export type UpdateUserAccessMutation = {
  updateUserAccess: {
    __typename: 'User';
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    permissions: AccessLevel;
    username: string;
  };
};

export type GetPetitionQueryVariables = {
  PK: string;
};

export type GetPetitionQuery = {
  getPetition:
    | (
        | {
            __typename: 'CandidatePetition';
            PK: string;
            createdAt: string;
            owner: string;
            signatureSummary?: {
              __typename: string;
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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
              approved?: number | null;
              deadline?: string | null;
              rejected?: number | null;
              required?: number | null;
              submitted?: number | null;
              verified?: number | null;
            } | null;
            signatures: {
              __typename: string;
              items: Array<{
                __typename: string;
                PK: string;
                address: string;
                createdAt: string;
                isVerified: boolean;
                method: VerificationMethod;
                name: string;
                signer: string;
                status: SignatureStatus;
                updatedAt: string;
                verifiedAt?: string | null;
              }>;
              token?: string | null;
            };
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
            approved?: number | null;
            deadline?: string | null;
            rejected?: number | null;
            required?: number | null;
            submitted?: number | null;
            verified?: number | null;
          } | null;
          signatures: {
            __typename: string;
            token?: string | null;
          };
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
            approved?: number | null;
            deadline?: string | null;
            rejected?: number | null;
            required?: number | null;
            submitted?: number | null;
            verified?: number | null;
          } | null;
          signatures: {
            __typename: string;
            token?: string | null;
          };
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
            approved?: number | null;
            deadline?: string | null;
            rejected?: number | null;
            required?: number | null;
            submitted?: number | null;
            verified?: number | null;
          } | null;
          signatures: {
            __typename: string;
            token?: string | null;
          };
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
            approved?: number | null;
            deadline?: string | null;
            rejected?: number | null;
            required?: number | null;
            submitted?: number | null;
            verified?: number | null;
          } | null;
          signatures: {
            __typename: string;
            token?: string | null;
          };
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

export type GetResourceUploadURLQueryVariables = {
  query: GetResourceUploadURLInput;
};

export type GetResourceUploadURLQuery = {
  getResourceUploadURL?: string | null;
};

export type GetResourceVersionQueryVariables = {
  query: GetResourceVersionInput;
};

export type GetResourceVersionQuery = {
  getResourceVersion?: string | null;
};

export type GetSignaturesByPetitionQueryVariables = {
  query?: SignaturesByPetitionInput | null;
};

export type GetSignaturesByPetitionQuery = {
  getSignaturesByPetition: {
    __typename: 'SignatureConnection';
    items: Array<{
      __typename: 'Signature';
      PK: string;
      address: string;
      createdAt: string;
      isVerified: boolean;
      method: VerificationMethod;
      name: string;
      signer: string;
      status: SignatureStatus;
      updatedAt: string;
      verifiedAt?: string | null;
    }>;
    token?: string | null;
  };
};

export type GetSiteResourcesQueryVariables = {
  query: ListResourcesInput;
};

export type GetSiteResourcesQuery = {
  getSiteResources: {
    __typename: 'ResourceConnection';
    items: Array<string>;
    token?: string | null;
  };
};

export type GetUsersQueryVariables = {
  query?: SearchUsersInput | null;
};

export type GetUsersQuery = {
  getUsers: {
    __typename: 'UserConnection';
    items: Array<{
      __typename: 'User';
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      permissions: AccessLevel;
      username: string;
    }>;
    token?: string | null;
  };
};

export type GetVoterRecordMatchQueryVariables = {
  query: VoterRecordMatchInput;
};

export type GetVoterRecordMatchQuery = {
  getVoterRecordMatch: {
    __typename: 'VoterRecordMatch';
    address: string;
    city: string;
    fullName: string;
    methods: Array<string>;
    state: string;
    token?: string | null;
    zipCode: string;
  };
};

export type PublicEchoQueryVariables = {
  ping: string;
};

export type PublicEchoQuery = {
  publicEcho: string;
};

export type SiteConfigurationQuery = {
  siteConfiguration: {
    __typename: 'SiteConfiguration';
    buttonColor?: string | null;
    headerColor?: string | null;
    highlightColor?: string | null;
    logoImage?: string | null;
    version: number;
  };
};

export type UpdatedSiteConfigurationSubscription = {
  updatedSiteConfiguration?: {
    __typename: 'SiteConfiguration';
    buttonColor?: string | null;
    headerColor?: string | null;
    highlightColor?: string | null;
    logoImage?: string | null;
    version: number;
  } | null;
};
