/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      status
      type
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
      status
      title
      type
    }
  }
`;
