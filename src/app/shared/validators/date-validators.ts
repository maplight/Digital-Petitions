import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static greaterThan(date: Date): ValidatorFn {
    return (
      control: AbstractControl<Date | undefined>
    ): ValidationErrors | null => {
      const currentDate = control.value;

      if (!currentDate) {
        return null;
      }

      if (currentDate < date) {
        return { greaterThan: true };
      }

      return null;
    };
  }
}
