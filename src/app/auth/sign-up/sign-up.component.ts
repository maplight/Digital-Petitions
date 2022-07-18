import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpForm } from './sign-up-form.interface';
import { state, states } from '../../core/states';
import { AccountService } from '../account-service/account.service';
import {
  BehaviorSubject,
  exhaustMap,
  filter,
  map,
  merge,
  partition,
  shareReplay,
} from 'rxjs';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  protected local_states: state[] = states;

  protected hide_password = true;
  protected response_error$: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  public formGroup: FormGroup;
  public form_data: SignUpForm = {
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    apt_number: new FormControl('', [Validators.required]),
    state: new FormControl<state | null>(null, [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  };

  private submit = new BehaviorSubject<any>(null);

  constructor(
    private formBuilder: FormBuilder,
    private account_service: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
  }

  ngOnInit(): void {
    const start$ = this.submit.pipe(
      filter((_) => this.formGroup.valid),
      shareReplay(1)
    );
    const result$ = start$.pipe(
      exhaustMap((data) => this.account_service.signUp(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(result$, (value) => value.result);

    success$.pipe(map((value) => value.result)).subscribe((data) => {
      console.log('success ' + data);
    });

    error$.pipe(map((value) => value.error)).subscribe((data) => {
      console.log('error ' + data);
      this.response_error$.next(data);
    });

    const end$ = merge(success$, error$);

    const loading$ = merge(
      start$.pipe(map((v) => true)),
      end$.pipe(map((v) => false))
    ).pipe(shareReplay(1));

    loading$.subscribe((value) => {
      if (value) {
        console.log('start');
      } else {
        console.log('end');
      }
    });
  }

  saveForm() {
    this.submit.next(this.formGroup.value);
  }
}
