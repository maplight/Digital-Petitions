import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInForm } from './sign-in-form.interface';

@Component({
  selector: 'dp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  protected hide_password = true;

  public formGroup: FormGroup;
  public form_data: SignInForm = {
    email: '',
    password: '',
  };
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  saveForm() {
    console.log(this.formGroup.value);
  }
}
