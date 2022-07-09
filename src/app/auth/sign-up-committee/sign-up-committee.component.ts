import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpForm } from './sign-up-form.interface';
import { state, states } from './states';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up-committee.component.html',
  styleUrls: ['./sign-up-committee.component.scss'],
})
export class SignUpCommitteeComponent implements OnInit {
  public local_states: state[] = states;

  public hide = true;

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
