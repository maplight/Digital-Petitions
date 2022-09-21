import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminSignUpData } from 'src/app/shared/models/auth/admin-sign-up-data';

@Component({
  selector: 'dp-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  @Input() loading: boolean | null = false;
  @Output() submitSignUpData = new EventEmitter<AdminSignUpData>();

  protected hidePassword = true;

  protected formGroup!: FormGroup<any>;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.invalid) return;

    this.submitSignUpData.emit(this.formGroup.getRawValue());
  }
}
