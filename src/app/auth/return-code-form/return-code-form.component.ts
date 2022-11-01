import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-return-code-form',
  templateUrl: './return-code-form.component.html',
})
export class ReturnCodeFormComponent {
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,

    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this._router.navigate(['auth/sign-up/' + this.formGroup.value.email]);
    }
  }
}
