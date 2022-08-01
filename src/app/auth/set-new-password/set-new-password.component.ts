import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CheckTokenFpService } from 'src/app/logic/auth/exports';

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
    private _data: ActivatedRoute,
    private _checkTokenFpLogic: CheckTokenFpService
  ) {
    this.result$ = this._checkTokenFpLogic.result$;
    this.loading$ = this._checkTokenFpLogic.loading$;
  }
  ngAfterViewInit(): void {
    this._checkTokenFpLogic.sendToken(this._data.snapshot.params['token']);
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
