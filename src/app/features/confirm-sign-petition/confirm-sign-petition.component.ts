import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dp-confirm-sign-petition',
  templateUrl: './confirm-sign-petition.component.html',
})
export class ConfirmSignPetitionComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  submit() {}
  cancel() {}
}
