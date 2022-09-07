/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPetition = /* GraphQL */ `
  query GetPetition($PK: ID!) {
    getPetition(PK: $PK) {
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
export const getPetitionsByOwner = /* GraphQL */ `
  query GetPetitionsByOwner($query: PetitionsByOwnerInput) {
    getPetitionsByOwner(query: $query) {
      items {
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
      token
    }
  }
`;
export const getPetitionsByType = /* GraphQL */ `
  query GetPetitionsByType($query: PetitionsByTypeInput) {
    getPetitionsByType(query: $query) {
      items {
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
      token
    }
  }
`;
export const getSignaturesByPetition = /* GraphQL */ `
  query GetSignaturesByPetition($query: SignaturesByPetitionInput) {
    getSignaturesByPetition(query: $query) {
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
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($query: SearchUsersInput) {
    getUsers(query: $query) {
      items {
        email
        firstName
        lastName
        permissions
        username
      }
      token
    }
  }
`;
export const publicEcho = /* GraphQL */ `
  query PublicEcho($ping: String!) {
    publicEcho(ping: $ping)
  }
`;
