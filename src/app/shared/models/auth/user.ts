export interface Attributes {
  sub: string;
  address: string;
  email_verified: boolean;
  given_name: string;
  'custom:access_group':
    | 'petitioner'
    | 'admin'
    | 'city_staff'
    | 'city_staff_guest';
  family_name: string;
  email: string;
}

export interface CognitoUserFacade {
  attributes: Attributes;
  challengeName: 'NEW_PASSWORD_REQUIRED';
  username: string;
}
