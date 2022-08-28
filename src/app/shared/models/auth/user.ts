export interface Attributes {
  sub: string;
  address: string;
  email_verified: boolean;
  given_name: string;
  custom: { access_group: string };
  family_name: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  attributes: Attributes;
}

export interface CognitoUserLite {
  username: string;
  attributes: Attributes;
}
