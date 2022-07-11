import { FormControl } from '@angular/forms';

export interface ChangePasswordForm {
  old_password: FormControl;
  new_password: FormControl;
}
