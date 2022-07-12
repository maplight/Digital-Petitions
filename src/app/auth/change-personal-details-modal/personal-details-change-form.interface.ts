import { FormControl } from '@angular/forms';

export interface PersonalDetailsChangeForm {
  first_name: FormControl;
  last_name: FormControl;
  address: FormControl;
  apt_number: FormControl;
  state: FormControl;
  zip_code: FormControl;
}
