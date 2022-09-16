/**
 * Query a petition's data.
 *
 * Check the inner objects for variants of this query
 * catered to different access levels.
 */
export const getPetition = {
  /**
   * Select only publicly available fields.
   * Does not require special priviledges.
   */
  public: /* GraphQL */ `
    query GetPetitionAsCommonUser($PK: ID!) {
      getPetition(PK: $PK) {
        PK
        owner
        signatureSummary {
          approved
          deadline
          required
        }
        status
        type
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
  `,

  /**
   * Query public fields plus limited access data.
   * Requires Staff access level.
   */
  staff: /* GraphQL */ `
    query GetPetitionAsStaff($PK: ID!) {
      getPetition(PK: $PK) {
        PK
        owner
        signatureSummary {
          approved
          deadline
          required
          submitted
        }
        status
        type
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
  `,
};

/**
 * List petitions based on owning user.
 *
 * User must be logged in to issue this request.
 *
 * Only publicly available fields are selected, and those that
 * are displayed on list views, so no special access rights are
 * required.
 */
export const getPetitionsByOwner = /* GraphQL */ `
  query GetPetitionsByOwner($query: PetitionsByOwnerInput) {
    getPetitionsByOwner(query: $query) {
      items {
        PK
        signatureSummary {
          approved
          deadline
          required
        }
        status
        type
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

/**
 * List petitions based on filter on petition type and
 * alternatively on status.
 *
 * This query is public.
 */
export const getPetitionsByType = /* GraphQL */ `
  query GetPetitionsByType($query: PetitionsByTypeInput) {
    getPetitionsByType(query: $query) {
      items {
        PK
        owner
        signatureSummary {
          approved
          deadline
          required
        }
        status
        type
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

/**
 * Request a pre-signed URL to upload a resource.
 * Requires Admin access level.
 */
export const getResourceUploadURL = /* GraphQL */ `
  query GetResourceUploadURL($query: GetResourceUploadURLInput!) {
    getResourceUploadURL(query: $query)
  }
`;

/**
 * Request the latest uploaded item for a site resource type.
 * Requires Admin access level.
 */
export const getResourceVersion = /* GraphQL */ `
  query GetResourceVersion($query: GetResourceVersionInput!) {
    getResourceVersion(query: $query)
  }
`;

/**
 * Request a list of signatures submitted for a petition.
 * Requires Staff access level.
 */
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

/**
 * Load resources available for customizing the site's look and feel configuration.
 * Requires Admin
 */
export const getSiteResources = /* GraphQL */ `
  query GetSiteResources($query: ListResourcesInput!) {
    getSiteResources(query: $query) {
      items
      token
    }
  }
`;

/**
 * List active users.
 * Requires Admin access level.
 */
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

/**
 * Load the current look and feel for the site.
 * This request is public.
 */
export const siteConfiguration = /* GraphQL */ `
  query SiteConfiguration {
    siteConfiguration {
      buttonColor
      headerColor
      highlightColor
      logoImage
      version
    }
  }
`;
