import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpForm } from './sign-up-form.interface';
import { state, states } from '../../core/states';
import { SignUpService } from 'src/app/logic/auth/exports';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '../account-service/account.service';

@Component({
  selector: 'dp-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy {
  protected local_states: state[] = states;

  protected hide_password = true;
  protected result$;
  protected loading$ = this.SignUpService.loading$;
  private _unsubscribeAll: Subject<null> = new Subject();

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

  constructor(
    private formBuilder: FormBuilder,
    private SignUpService: SignUpService,
    private AccountService: AccountService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.SignUpService.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          /*redirect*/
          AccountService.updateUser(true);
        }
      })
    );
    this.loading$ = this.SignUpService.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.valid) {
      this.SignUpService.formGroupValue = this.formGroup.value;
    }

    //this.submit.next(this.formGroup.value);
  }
}
