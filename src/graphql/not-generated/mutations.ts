/**
 * Mutation to approve a petition.
 *
 * Requires Staff or higher level access and the petition
 * to be on the NEW status.
 *
 * Only returns fields that
 * are modified on the petition info after approval, since all other
 * fields are unaffected by this action.
 */
export const approvePetition = /* GraphQL */ `
  mutation ApprovePetition($data: ApprovePetitionInput!) {
    approvePetition(data: $data) {
      PK
      type
      signatureSummary {
        deadline
        required
      }
      status
      version
    }
  }
`;

/**
 * Mutation to reject a petition.
 *
 * Requires Staff or higher level access and the petition
 * to be on the NEW status.
 *
 * Only returns fields that
 * are modified on the petition info after rejection, since all other
 * fields are unaffected by this action.
 */
export const rejectPetition = /* GraphQL */ `
  mutation RejectPetition($data: TargetPetitionInput!) {
    rejectPetition(data: $data) {
      PK
      status
      version
    }
  }
`;

/**
 * Mutation to create a new administrative user.
 *
 * Requires Admin level access.
 *
 * Only returns the data available for such users on creation
 * (personal data is not set for them at the time of invitation)
 */
export const createStaffUser = /* GraphQL */ `
  mutation CreateStaffUser($data: StaffUserInput!) {
    createStaffUser(data: $data) {
      email
      permissions
      username
    }
  }
`;

/**
 * Mutation for deleting a staff user.
 *
 * Requires Admin level access.
 *
 * Return value is simply confirmation of whether the action
 * was successful or not.
 */
export const deleteStaffUser = /* GraphQL */ `
  mutation DeleteStaffUser($username: ID!) {
    deleteStaffUser(username: $username)
  }
`;

/**
 * Mutation for editing a Candidate petition.
 *
 * Requires authenticated user to be the petition owner
 * and that the current status for the target petition is NEW.
 *
 * Returns all relevant fields for a NEW petition (excluding
 * all signature data, as that would require it to be ACTIVE)
 */
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
      name
      office
      party
      version
    }
  }
`;

/**
 * Mutation for editing an Issue petition.
 *
 * Requires authenticated user to be the petition owner
 * and that the current status for the target petition is NEW.
 *
 * Returns all relevant fields for a NEW petition (excluding
 * all signature data, as that would require it to be ACTIVE)
 */
export const editIssuePetition = /* GraphQL */ `
  mutation EditIssuePetition($data: EditIssuePetitionInput!) {
    editIssuePetition(data: $data) {
      PK
      detail
      title
      version
    }
  }
`;

/**
 * Submit a new Candidate petition.
 *
 * Requires the user to be a Petitioner.
 *
 * Returns the newly created Petition.
 */
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
      name
      office
      party
      status
      type
      version
    }
  }
`;

/**
 * Submit a new Issue petition.
 *
 * Requires the user to be a Petitioner.
 *
 * Returns the newly created Petition.
 */
export const submitIssuePetition = /* GraphQL */ `
  mutation SubmitIssuePetition($data: IssuePetitionInput!) {
    submitIssuePetition(data: $data) {
      PK
      detail
      title
      status
      type
      version
    }
  }
`;

/**
 * Update the site's look and feel.
 *
 * Requires Admin access level.
 *
 * Due to limitations on the implementation of AppSync subscriptions,
 * in order for the site look and feel data to be forwarded to all
 * users immediately after an admin updates it, all of the fields in
 * the result must be included in the selection.
 */
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

/**
 * Update access level for an administrative user.
 *
 * Requires Admin access level.
 *
 * Returns the new permission status for the user, as this is
 * the only value modified by this mutation.
 */
export const updateUserAccess = /* GraphQL */ `
  mutation UpdateUserAccess($data: UpdateUserAccessInput!) {
    updateUserAccess(data: $data) {
      permissions
    }
  }
`;
