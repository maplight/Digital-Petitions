import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, tap } from 'rxjs';
import { SetNewPasswordService } from 'src/app/application/set-new-password.service';
import { AccountService } from '../../account-service/account.service';
import { SetNewPasswordForm } from '../set-new-password-form.interface';

@Component({
  selector: 'dp-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  protected hideConfirmPassword = true;
  protected password = true;

  protected result$;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  @Output() event = new EventEmitter<boolean>();
  public formGroup: FormGroup;
  public form_data: SetNewPasswordForm = {
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  };

  constructor(
    private formBuilder: FormBuilder,
    private SetNewPasswordService: SetNewPasswordService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.SetNewPasswordService.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this.event.emit(true);
          AccountService.updateUser(true);
        }
      })
    );
    this.loading$ = this.SetNewPasswordService.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this.SetNewPasswordService.formGroupValue = this.formGroup.value;
    }
  }
}
