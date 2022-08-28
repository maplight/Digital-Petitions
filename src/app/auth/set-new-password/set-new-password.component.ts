import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { SetNewPasswordService } from 'src/app/logic/auth/exports';

@Component({
  selector: 'dp-set-new-password',
  templateUrl: './set-new-password.component.html',
  providers: [SetNewPasswordService],
})
export class SetNewPasswordComponent implements OnInit, OnDestroy {
  protected hideConfirmPassword = true;
  protected password = true;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  private _unsubscribeAll: Subject<void> = new Subject();
  public formGroup: FormGroup;

  constructor(
    private _router: Router,
    private _data: ActivatedRoute,
    private _fb: FormBuilder,
    private _setNewPasswordLogic: SetNewPasswordService
  ) {
    this.formGroup = this._fb.group({
      username: [this._data.snapshot.params['email']],
      code: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.error$ = this._setNewPasswordLogic.error$;
    this.loading$ = this._setNewPasswordLogic.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      this._setNewPasswordLogic.formGroupValue(this.formGroup.value);
    }
  }
}
