import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dp-change-account-permission',
  templateUrl: './change-account-permission.component.html',
})
export class ChangeAccountPermissionComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }
  ) {
    this.formGroup = this._fb.group({
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  submit() {}
}
