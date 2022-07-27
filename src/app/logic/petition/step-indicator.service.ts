import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepIndicatorService implements OnDestroy {
  private _currentStep$: Subject<'1' | '21' | '22' | '3'> = new Subject();
  public _publicCurrentStep$: Observable<'1' | '21' | '22' | '3'> =
    this._currentStep$.asObservable();
  constructor() {}
  ngOnDestroy(): void {
    this._currentStep$.complete();
  }
  set currentStep(step: '1' | '21' | '22' | '3') {
    this._currentStep$.next(step);
  }
}
