import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepIndicatorService implements OnDestroy {
  private _currentStep$: Subject<'type' | 'issue' | 'candidate' | 'result'> =
    new Subject();
  public _publicCurrentStep$: Observable<
    'type' | 'issue' | 'candidate' | 'result'
  > = this._currentStep$.asObservable();
  constructor() {}
  ngOnDestroy(): void {
    this._currentStep$.complete();
  }
  set currentStep(step: 'type' | 'issue' | 'candidate' | 'result') {
    this._currentStep$.next(step);
  }
}
