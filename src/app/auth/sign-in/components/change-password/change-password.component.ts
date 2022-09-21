import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dp-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  @Input() loading: boolean | null = false;
  @Output() changePassword = new EventEmitter<{ password: string | null }>();

  protected hidePassword = true;

  protected formGroup!: FormGroup<{ password: FormControl<string | null> }>;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._fb.group({ password: ['', [Validators.required]] });
  }

  submit() {
    if (this.formGroup.invalid) return;

    this.changePassword.emit(this.formGroup.getRawValue());
  }
}
