/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const approvePetition = /* GraphQL */ `
  mutation ApprovePetition($data: ApprovePetitionInput!) {
    approvePetition(data: $data) {
      PK
      createdAt
      owner
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      type
      updatedAt
      version
      ... on CandidatePetition {
        address {
          address
          city
          number
          state
          zipCode
        }
        name
        office
        party
      }
      ... on IssuePetition {
        detail
        title
      }
    }
  }
`;
export const createStaffUser = /* GraphQL */ `
  mutation CreateStaffUser($data: StaffUserInput!) {
    createStaffUser(data: $data) {
      email
      firstName
      lastName
      permissions
      username
    }
  }
`;
export const deleteStaffUser = /* GraphQL */ `
  mutation DeleteStaffUser($username: ID!) {
    deleteStaffUser(username: $username)
  }
`;
export const editCandidatePetition = /* GraphQL */ `
  mutation EditCandidatePetition($data: EditCandidatePetitionInput!) {
    editCandidatePetition(data: $data) {
      PK
      address {
        address
        city
        number
        state
        zipCode
      }
      createdAt
      name
      office
      owner
      party
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      type
      updatedAt
      version
    }
  }
`;
export const editIssuePetition = /* GraphQL */ `
  mutation EditIssuePetition($data: EditIssuePetitionInput!) {
    editIssuePetition(data: $data) {
      PK
      createdAt
      detail
      owner
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      title
      type
      updatedAt
      version
    }
  }
`;
export const rejectPetition = /* GraphQL */ `
  mutation RejectPetition($data: TargetPetitionInput!) {
    rejectPetition(data: $data) {
      PK
      createdAt
      owner
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      type
      updatedAt
      version
      ... on CandidatePetition {
        address {
          address
          city
          number
          state
          zipCode
        }
        name
        office
        party
      }
      ... on IssuePetition {
        detail
        title
      }
    }
  }
`;
export const submitCandidatePetition = /* GraphQL */ `
  mutation SubmitCandidatePetition($data: CandidatePetitionInput!) {
    submitCandidatePetition(data: $data) {
      PK
      address {
        address
        city
        number
        state
        zipCode
      }
      createdAt
      name
      office
      owner
      party
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      type
      updatedAt
      version
    }
  }
`;
export const submitIssuePetition = /* GraphQL */ `
  mutation SubmitIssuePetition($data: IssuePetitionInput!) {
    submitIssuePetition(data: $data) {
      PK
      createdAt
      detail
      owner
      signatureSummary {
        approved
        deadline
        required
        submitted
      }
      signatures {
        items {
          address
          createdAt
          name
          signer
          status
          updatedAt
        }
        token
      }
      status
      title
      type
      updatedAt
      version
    }
  }
`;
export const updateSiteConfiguration = /* GraphQL */ `
  mutation UpdateSiteConfiguration($data: SiteConfigurationInput!) {
    updateSiteConfiguration(data: $data) {
      buttonColor
      headerColor
      highlightColor
      logoImage
      version
    }
  }
`;
export const updateUserAccess = /* GraphQL */ `
  mutation UpdateUserAccess($data: UpdateUserAccessInput!) {
    updateUserAccess(data: $data) {
      email
      firstName
      lastName
      permissions
      username
    }
  }
`;
