import { FormControl } from '@angular/forms';

export interface SignUpForm {
  first_name: FormControl;
  last_name: FormControl;
  address: FormControl;
  apt_number: FormControl;
  state: FormControl;
  zip_code: FormControl;
  email: FormControl;
  password: FormControl;
}
