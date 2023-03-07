import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TargetPetitionInput } from 'src/app/core/api/API';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';

@Component({
  selector: 'dp-confirm-withdrawl-petition',
  templateUrl: './confirm-withdrawl-petition.component.html',
  providers: [WithdrawPetitionService],
})
export class ConfirmWithdrawlPetitionComponent implements OnInit {
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _withdrawlLogic: WithdrawPetitionService,
    @Inject(MAT_DIALOG_DATA) public data: TargetPetitionInput,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      code: new FormControl('', [
        Validators.required,
        Validators.pattern('YES'),
      ]),
    });
  }
  ngOnInit(): void {
    this._withdrawlLogic.success$.subscribe((result) => {
      this._router.navigate(['/committee/home', this.data.PK, result]);
      this._dialog.closeAll();
    });
    this.loading$ = this._withdrawlLogic.loading$;

    this.error$ = this._withdrawlLogic.error$.pipe(
      map(() => 'Something happened')
    );
  }

  submit() {
    this._withdrawlLogic.withdrawPetition(this.data);
  }
}
