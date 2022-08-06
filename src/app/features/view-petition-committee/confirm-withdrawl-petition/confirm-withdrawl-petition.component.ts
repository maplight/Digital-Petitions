import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';

@Component({
  selector: 'dp-confirm-withdrawl-petition',
  templateUrl: './confirm-withdrawl-petition.component.html',
})
export class ConfirmWithdrawlPetitionComponent implements OnInit {
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'contents'
  );
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: { id: number },
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

  ngOnInit(): void {}

  submit() {}
}
