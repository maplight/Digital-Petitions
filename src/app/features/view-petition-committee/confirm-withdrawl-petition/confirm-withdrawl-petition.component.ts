import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatLegacyDialog as MatDialog,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string },
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
      this._router.navigate(['/committee/home', this.data.id, result]);
      this._dialog.closeAll();
    });
    this.loading$ = this._withdrawlLogic.loading$;
  }

  submit() {
    this._withdrawlLogic.withdrawPetition(this.data.id);
  }
}
