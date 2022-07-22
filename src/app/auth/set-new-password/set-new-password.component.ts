import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject, tap } from 'rxjs';
import { CheckTokenFpService } from 'src/app/core/application/check-token-fp.service';
import { SetNewPasswordService } from 'src/app/core/application/set-new-password.service';
import { AccountService } from '../account-service/account.service';
import { SetNewPasswordForm } from './set-new-password-form.interface';

@Component({
  selector: 'dp-set-new-password',
  templateUrl: './set-new-password.component.html',
})
export class SetNewPasswordComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  protected result$;
  public trueResponseForm = false;
  protected loading$;
  private _unsubscribeAll: Subject<void> = new Subject();
  constructor(
    private rutaActiva: ActivatedRoute,
    private CheckTokenFpService: CheckTokenFpService,
    private AccountService: AccountService
  ) {
    this.result$ = this.CheckTokenFpService.result$;
    this.loading$ = this.CheckTokenFpService.loading$;
  }
  ngAfterViewInit(): void {
    this.CheckTokenFpService.sendToken(
      this.rutaActiva.snapshot.params['token']
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  setResponseForm(data: boolean) {
    this.trueResponseForm = data;
  }
}
