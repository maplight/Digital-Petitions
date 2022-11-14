import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepIndicatorService implements OnDestroy, OnInit {
  ngOnInit(): void {
    this._currentStep$.next('type');
  }
  private _currentStep$: ReplaySubject<
    'type' | 'issue' | 'candidate' | 'result'
  > = new ReplaySubject<'type' | 'issue' | 'candidate' | 'result'>();
  public _publicCurrentStep$: Observable<
    'type' | 'issue' | 'candidate' | 'result'
  > = this._currentStep$.asObservable();
  ngOnDestroy(): void {
    this._currentStep$.complete();
  }
  setCurrentStep(step: 'type' | 'issue' | 'candidate' | 'result') {
    this._currentStep$.next(step);
  }
}
