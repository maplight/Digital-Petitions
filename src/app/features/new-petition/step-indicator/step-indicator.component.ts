import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';

@Component({
  selector: 'dp-step-indicator',
  templateUrl: './step-indicator.component.html',
  providers: [StepIndicatorService],
})
export class StepIndicatorComponent implements OnInit, OnDestroy {
  private basicStyleElement: string =
    'bg-[#EFEFEF] w-6 h-6 rounded-full flex justify-center items-center font-roboto text-[#8A8A8A] text-sm leading-[14px] font-normal border border-[#EFEFEF] cursor-default';
  private basicStyleLine: string = 'bg-[#EFEFEF] md:w-[122px] w-[61px] h-[2px]';
  private accentStyleElement: string =
    'bg-[#ECF0FF] w-6 h-6 rounded-full flex justify-center items-center font-roboto text-[#2D5BFF] text-sm leading-[14px] font-normal border border-[#ECF0FF] cursor-default';
  private accentStyleLine: string =
    'bg-[#ECF0FF] md:w-[122px] w-[61px] h-[2px]';

  protected styleElement1: string = this.basicStyleElement;
  protected styleElement2: string = this.basicStyleElement;
  protected styleElement3: string = this.basicStyleElement;
  protected styleLine1: string = this.basicStyleLine;
  protected styleLine2: string = this.basicStyleLine;

  private _unsubscribeAll: Subject<void> = new Subject();

  constructor(private _stepLogic: StepIndicatorService) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  private setDefaultStyle() {
    this.styleElement1 = this.basicStyleElement;
    this.styleElement2 = this.basicStyleElement;
    this.styleElement3 = this.basicStyleElement;
    this.styleLine1 = this.basicStyleLine;
    this.styleLine2 = this.basicStyleLine;
  }

  ngOnInit(): void {
    this._stepLogic._publicCurrentStep$
      .pipe(
        tap((step) => {
          this.setDefaultStyle();
          switch (step) {
            case 'type':
              this.styleElement1 = this.accentStyleElement;
              break;
            case 'issue':
              this.styleElement1 = this.accentStyleElement;
              this.styleLine1 = this.accentStyleLine;
              this.styleElement2 = this.accentStyleElement;
              break;
            case 'candidate':
              this.styleElement1 = this.accentStyleElement;
              this.styleLine1 = this.accentStyleLine;
              this.styleElement2 = this.accentStyleElement;
              break;
            case 'result':
              this.styleElement1 = this.accentStyleElement;
              this.styleLine1 = this.accentStyleLine;
              this.styleElement2 = this.accentStyleElement;
              this.styleLine2 = this.accentStyleLine;
              this.styleElement3 = this.accentStyleElement;
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
  }
}
