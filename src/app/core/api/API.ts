/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TargetPetitionInput = {
  PK: string,
  expectedVersion: number,
};

export type Petition = {
  __typename: "Petition",
  PK: string,
  createdAt: string,
  owner: string,
  signatureSummary?: SignatureSummary | null,
  signatures: SignatureConnection,
  status: PetitionStatus,
  type: PetitionType,
  updatedAt: string,
  version: number,
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
  signatures: SignatureConnection,
  status: PetitionStatus,
  type: PetitionType,
  updatedAt: string,
  version: number,
};

export type AddressData = {
  __typename: "AddressData",
  address: string,
  city?: string | null,
  number?: string | null,
  state: string,
  zipCode?: string | null,
};

export type SignatureSummary = {
  __typename: "SignatureSummary",
  approved: number,
  deadline?: string | null,
  required: number,
  submitted: number,
};

export type SignatureConnection = {
  __typename: "SignatureConnection",
  items:  Array<Signature >,
  token?: string | null,
};

export type Signature = {
  __typename: "Signature",
  address: string,
  createdAt: string,
  name: string,
  signer: string,
  status: SignatureStatus,
  updatedAt: string,
};

export enum SignatureStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUBMITTED = "SUBMITTED",
  VERIFIED = "VERIFIED",
}


export enum PetitionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  NEW = "NEW",
  NOT_QUALIFIED = "NOT_QUALIFIED",
  QUALIFIED = "QUALIFIED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export enum PetitionType {
  CANDIDATE = "CANDIDATE",
  ISSUE = "ISSUE",
}


export type IssuePetition = {
  __typename: "IssuePetition",
  PK: string,
  createdAt: string,
  detail: string,
  owner: string,
  signatureSummary?: SignatureSummary | null,
  signatures: SignatureConnection,
  status: PetitionStatus,
  title: string,
  type: PetitionType,
  updatedAt: string,
  version: number,
};

export type StaffUserInput = {
  email: string,
  permissions: StaffAccessLevel,
};

export enum StaffAccessLevel {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  STAFF = "STAFF",
}


export type User = {
  __typename: "User",
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  permissions: AccessLevel,
  username: string,
};

export enum AccessLevel {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  NONE = "NONE",
  PETITIONER = "PETITIONER",
  STAFF = "STAFF",
}


export type EditCandidatePetitionInput = {
  PK: string,
  address?: AddressInput | null,
  expectedVersion: number,
  office?: string | null,
  party?: string | null,
};

export type AddressInput = {
  address: string,
  city?: string | null,
  number?: string | null,
  state: string,
  zipCode?: string | null,
};

export type EditIssuePetitionInput = {
  PK: string,
  detail?: string | null,
  expectedVersion: number,
  title?: string | null,
};

export type CandidatePetitionInput = {
  address: AddressInput,
  name: string,
  office: string,
  party: string,
};

export type IssuePetitionInput = {
  detail: string,
  title: string,
};

export type PetitionsByOwnerInput = {
  cursor?: string | null,
  limit?: number | null,
  owner: string,
  status?: PetitionStatusQuery | null,
};

export enum PetitionStatusQuery {
  ACTIVE = "ACTIVE",
  ANY = "ANY",
  CANCELED = "CANCELED",
  INACTIVE = "INACTIVE",
  NEW = "NEW",
  NOT_QUALIFIED = "NOT_QUALIFIED",
  QUALIFIED = "QUALIFIED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export type PetitionConnection = {
  __typename: "PetitionConnection",
  items:  Array<Petition >,
  token?: string | null,
};

export type PetitionsByTypeInput = {
  cursor?: string | null,
  limit?: number | null,
  status?: PetitionStatusQuery | null,
  type?: PetitionType | null,
};

export type SignaturesByPetitionInput = {
  cursor?: string | null,
  limit?: number | null,
  petition: string,
  status?: SignatureStatusQuery | null,
};

export enum SignatureStatusQuery {
  ANY = "ANY",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUBMITTED = "SUBMITTED",
  VERIFIED = "VERIFIED",
}


export type SearchUsersInput = {
  cursor?: string | null,
  limit?: number | null,
  searchEmail?: string | null,
  searchGroup?: AccessLevelQuery | null,
  searchName?: string | null,
};

export enum AccessLevelQuery {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  PETITIONER = "PETITIONER",
  STAFF = "STAFF",
}


export type UserConnection = {
  __typename: "UserConnection",
  items:  Array<User >,
  token?: string | null,
};

export type ApprovePetitionMutationVariables = {
  data: TargetPetitionInput,
};

export type ApprovePetitionMutation = {
  approvePetition: ( {
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
      status: PetitionStatus,
      type: PetitionType,
      updatedAt: string,
      version: number,
      detail: string,
      title: string,
    }
  ) | null,
};

export type CreateStaffUserMutationVariables = {
  data: StaffUserInput,
};

export type CreateStaffUserMutation = {
  createStaffUser:  {
    __typename: "User",
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    permissions: AccessLevel,
    username: string,
  },
};

export type DeleteStaffUserMutationVariables = {
  username: string,
};

export type DeleteStaffUserMutation = {
  deleteStaffUser: boolean,
};

export type EditCandidatePetitionMutationVariables = {
  data: EditCandidatePetitionInput,
};

export type EditCandidatePetitionMutation = {
  editCandidatePetition?:  {
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
    signatures:  {
      __typename: "SignatureConnection",
      items:  Array< {
        __typename: "Signature",
        address: string,
        createdAt: string,
        name: string,
        signer: string,
        status: SignatureStatus,
        updatedAt: string,
      } >,
      token?: string | null,
    },
    status: PetitionStatus,
    type: PetitionType,
    updatedAt: string,
    version: number,
  } | null,
};

export type EditIssuePetitionMutationVariables = {
  data: EditIssuePetitionInput,
};

export type EditIssuePetitionMutation = {
  editIssuePetition?:  {
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
    signatures:  {
      __typename: "SignatureConnection",
      items:  Array< {
        __typename: "Signature",
        address: string,
        createdAt: string,
        name: string,
        signer: string,
        status: SignatureStatus,
        updatedAt: string,
      } >,
      token?: string | null,
    },
    status: PetitionStatus,
    title: string,
    type: PetitionType,
    updatedAt: string,
    version: number,
  } | null,
};

export type RejectPetitionMutationVariables = {
  data: TargetPetitionInput,
};

export type RejectPetitionMutation = {
  rejectPetition: ( {
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
      status: PetitionStatus,
      type: PetitionType,
      updatedAt: string,
      version: number,
      detail: string,
      title: string,
    }
  ) | null,
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
    signatures:  {
      __typename: "SignatureConnection",
      items:  Array< {
        __typename: "Signature",
        address: string,
        createdAt: string,
        name: string,
        signer: string,
        status: SignatureStatus,
        updatedAt: string,
      } >,
      token?: string | null,
    },
    status: PetitionStatus,
    type: PetitionType,
    updatedAt: string,
    version: number,
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
    signatures:  {
      __typename: "SignatureConnection",
      items:  Array< {
        __typename: "Signature",
        address: string,
        createdAt: string,
        name: string,
        signer: string,
        status: SignatureStatus,
        updatedAt: string,
      } >,
      token?: string | null,
    },
    status: PetitionStatus,
    title: string,
    type: PetitionType,
    updatedAt: string,
    version: number,
  },
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
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
      signatures:  {
        __typename: string,
        items:  Array< {
          __typename: string,
          address: string,
          createdAt: string,
          name: string,
          signer: string,
          status: SignatureStatus,
          updatedAt: string,
        } >,
        token?: string | null,
      },
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
  query?: PetitionsByOwnerInput | null,
};

export type GetPetitionsByOwnerQuery = {
  getPetitionsByOwner:  {
    __typename: "PetitionConnection",
    items:  Array<( {
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
        signatures:  {
          __typename: string,
          token?: string | null,
        },
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
        signatures:  {
          __typename: string,
          token?: string | null,
        },
        status: PetitionStatus,
        type: PetitionType,
        updatedAt: string,
        version: number,
        detail: string,
        title: string,
      }
    ) >,
    token?: string | null,
  },
};

export type GetPetitionsByTypeQueryVariables = {
  query?: PetitionsByTypeInput | null,
};

export type GetPetitionsByTypeQuery = {
  getPetitionsByType:  {
    __typename: "PetitionConnection",
    items:  Array<( {
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
        signatures:  {
          __typename: string,
          token?: string | null,
        },
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
        signatures:  {
          __typename: string,
          token?: string | null,
        },
        status: PetitionStatus,
        type: PetitionType,
        updatedAt: string,
        version: number,
        detail: string,
        title: string,
      }
    ) >,
    token?: string | null,
  },
};

export type GetSignaturesByPetitionQueryVariables = {
  query?: SignaturesByPetitionInput | null,
};

export type GetSignaturesByPetitionQuery = {
  getSignaturesByPetition:  {
    __typename: "SignatureConnection",
    items:  Array< {
      __typename: "Signature",
      address: string,
      createdAt: string,
      name: string,
      signer: string,
      status: SignatureStatus,
      updatedAt: string,
    } >,
    token?: string | null,
  },
};

export type GetUsersQueryVariables = {
  query?: SearchUsersInput | null,
};

export type GetUsersQuery = {
  getUsers:  {
    __typename: "UserConnection",
    items:  Array< {
      __typename: "User",
      email: string,
      firstName?: string | null,
      lastName?: string | null,
      permissions: AccessLevel,
      username: string,
    } >,
    token?: string | null,
  },
};

export type PublicEchoQueryVariables = {
  ping: string,
};

export type PublicEchoQuery = {
  publicEcho: string,
};
