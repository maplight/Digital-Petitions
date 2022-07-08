import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpForm } from './sign-up-form.interface';
import { state, states } from '../../core/states';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  protected local_states: state[] = states;

  protected hide_password = true;

  public formGroup: FormGroup;
  public form_data: SignUpForm = {
    first_name: '',
    last_name: '',
    address: '',
    apt_number: '',
    state: '',
    zip_code: '',
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
