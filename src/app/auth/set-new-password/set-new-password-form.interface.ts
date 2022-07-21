import { FormControl } from '@angular/forms';

export interface SetNewPasswordForm {
  newPassword: FormControl;
  confirmPassword: FormControl;
}
