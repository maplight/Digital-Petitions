import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ConfirmSignPetitionService } from 'src/app/logic/petition/confirm-sign-petition.service';
import { Result } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-confirm-sign-petition',
  templateUrl: './confirm-sign-petition.component.html',
})
export class ConfirmSignPetitionComponent implements OnInit {
  public formGroup: FormGroup;

  protected result$!: Observable<Result<string>>;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _confirmSignPetitionLogic: ConfirmSignPetitionService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      code: ['', [Validators.required]],
    });
    this.result$ = this._confirmSignPetitionLogic.result$.pipe(
      tap((result) => {
        if (!!result.result) {
          this._router.navigate(['/petition/result-confirm-code']);
        } else {
          this.error = result.error;
        }
      })
    );
    this.loading$ = this._confirmSignPetitionLogic.loading$;
  }

  ngOnInit(): void {}
  submit() {
    if (this.formGroup.valid) {
      this._confirmSignPetitionLogic.formGroupValue = this.formGroup.value;
    }
  }
  cancel() {
    this._router.navigate(['/home']);
  }
}
