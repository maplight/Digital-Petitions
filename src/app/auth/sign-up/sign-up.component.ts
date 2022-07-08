import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    apt_number: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!%*?&])([A-Za-zd$@$!%*?&]|[^ ]){8,15}$/'
      ),
    ]),
  };
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {}

  saveForm() {
    console.log(this.formGroup.value);
  }
}
