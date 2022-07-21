export interface User {
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  contactData: {
    address: string;
    apt_number: string;
    state: string;
    zip_code: string;
  };
}
