import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, merge, Subject } from 'rxjs';
import { ConfirmSignPetitionService } from 'src/app/logic/petition/confirm-sign-petition.service';
import { Result } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-confirm-sign-petition',
  templateUrl: './confirm-sign-petition.component.html',
})
export class ConfirmSignPetitionComponent implements OnInit {
  public formGroup: FormGroup;

  protected error$!: Observable<string | undefined>;
  private localError$: Subject<string> = new Subject();
  protected loading$!: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _confirmSignPetitionLogic: ConfirmSignPetitionService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._confirmSignPetitionLogic.success$.subscribe((data) => {
      if (data?.error) {
        this.localError$.next(data.message);
      } else {
        this._router.navigate(['/petition/result-confirm-code']);
      }
    });
    this.loading$ = this._confirmSignPetitionLogic.loading$;
    this.error$ = merge(
      this._confirmSignPetitionLogic.error$,
      this.localError$
    );
  }
  submit() {
    if (this.formGroup.valid) {
      this._confirmSignPetitionLogic.setConfirmationCode(
        this.formGroup.value.code
      );
    }
  }
  cancel() {
    this._router.navigate(['/home']);
  }
}
