import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpForm } from './sign-up-form.interface';
import { state, states } from '../../core/states';
import { SignUpService } from 'src/app/core/application/sign-up.service';
import { Subject, takeUntil, tap } from 'rxjs';

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
    private SignUpService: SignUpService
  ) {
    this.formGroup = this.formBuilder.group(this.form_data);
    this.result$ = this.SignUpService.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          /*redirect*/
        }
      })
    );
    this.loading$ = this.SignUpService.loading$;
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    //this.SignUpService.unsuscribe();
  }

  ngOnInit(): void {
    //this.result$.subscribe(() => console.log('redirect'));
    //this.loading$.pipe(takeUntil(this._unsubscribeAll)).subscribe();
  }

  saveForm() {
    this.SignUpService.formGroupValue = this.formGroup;
    //this.submit.next(this.formGroup.value);
  }
}
