import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { SetNewPasswordService } from 'src/app/logic/auth/exports';

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

  constructor(
    private _fb: FormBuilder,
    private _setNewPasswordLogic: SetNewPasswordService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
    this.result$ = this._setNewPasswordLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this.event.emit(true);
          this._router.navigate([]);
        }
      })
    );
    this.loading$ = this._setNewPasswordLogic.loading$;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._setNewPasswordLogic.formGroupValue = this.formGroup.value;
    }
  }
}
