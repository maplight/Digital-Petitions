import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { SetNewPasswordService } from 'src/app/logic/auth/exports';
import { NewPasswordData } from 'src/app/shared/models/exports';

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
  protected email?: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _setNewPasswordLogic: SetNewPasswordService
  ) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.error$ = this._setNewPasswordLogic.error$;
    this.loading$ = this._setNewPasswordLogic.loading$;
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('email')!)
      )
      .subscribe((email) => (this.email = email));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  submit() {
    if (this.formGroup.valid) {
      let _newPasswordData: NewPasswordData = {
        username: this.email ?? '',
        code: this.formGroup.value.code,
        newPassword: this.formGroup.value.newPassword,
      };
      this._setNewPasswordLogic.newPasswordData(_newPasswordData);
    }
  }
}
