import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';

import { StepIndicatorComponent } from './step-indicator.component';

describe('StepIndicatorComponent', () => {
  let component: StepIndicatorComponent;
  let fixture: ComponentFixture<StepIndicatorComponent>;

  let _stepIndicatorService: StepIndicatorService;
  class MockStepIndicatorService {
    private _currentStep$: BehaviorSubject<
      'type' | 'issue' | 'candidate' | 'result'
    > = new BehaviorSubject<'type' | 'issue' | 'candidate' | 'result'>('type');
    public _publicCurrentStep$: Observable<
      'type' | 'issue' | 'candidate' | 'result'
    > = this._currentStep$.asObservable();
    constructor() {}
    ngOnDestroy(): void {
      this._currentStep$.complete();
    }
    setCurrentStep(step: 'type' | 'issue' | 'candidate' | 'result') {
      this._currentStep$.next(step);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepIndicatorComponent],
      providers: [
        StepIndicatorComponent,
        {
          provide: StepIndicatorService,
          useClass: MockStepIndicatorService,
        },
      ],
    }).compileComponents();

    _stepIndicatorService = TestBed.inject(StepIndicatorService);
    component = TestBed.inject(StepIndicatorComponent);
    fixture = TestBed.createComponent(StepIndicatorComponent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates the colors of the elements in the "type" step', () => {
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('type');
    fixture.detectChanges();

    //circle 1
    expect(element[1].className).toContain(activeBgColor);
    expect(element[1].className).toContain(activeTextColor);
    //line 1
    expect(element[2].className).toContain(inActiveBgColor);
    //circle 2
    expect(element[3].className).toContain(inActiveBgColor);
    expect(element[3].className).toContain(inActiveTextColor);
    //line 2
    expect(element[4].className).toContain(inActiveBgColor);
    //circle 3
    expect(element[5].className).toContain(inActiveBgColor);
    expect(element[5].className).toContain(inActiveTextColor);
  });
  it('evaluates the colors of the elements in the "issue" step', () => {
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('issue');
    fixture.detectChanges();

    //circle 1
    expect(element[1].className).toContain(activeBgColor);
    expect(element[1].className).toContain(activeTextColor);
    //line 1
    expect(element[2].className).toContain(activeBgColor);
    //circle 2
    expect(element[3].className).toContain(activeBgColor);
    expect(element[3].className).toContain(activeTextColor);
    //line 2
    expect(element[4].className).toContain(inActiveBgColor);
    //circle 3
    expect(element[5].className).toContain(inActiveBgColor);
    expect(element[5].className).toContain(inActiveTextColor);
  });
  it('evaluates the colors of the elements in the "candidate" step', () => {
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('candidate');
    fixture.detectChanges();

    //circle 1
    expect(element[1].className).toContain(activeBgColor);
    expect(element[1].className).toContain(activeTextColor);
    //line 1
    expect(element[2].className).toContain(activeBgColor);
    //circle 2
    expect(element[3].className).toContain(activeBgColor);
    expect(element[3].className).toContain(activeTextColor);
    //line 2
    expect(element[4].className).toContain(inActiveBgColor);
    //circle 3
    expect(element[5].className).toContain(inActiveBgColor);
    expect(element[5].className).toContain(inActiveTextColor);
  });
  it('evaluates the colors of the elements in the "result" step', () => {
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('result');
    fixture.detectChanges();

    //circle 1
    expect(element[1].className).toContain(activeBgColor);
    expect(element[1].className).toContain(activeTextColor);
    //line 1
    expect(element[2].className).toContain(activeBgColor);
    //circle 2
    expect(element[3].className).toContain(activeBgColor);
    expect(element[3].className).toContain(activeTextColor);
    //line 2
    expect(element[4].className).toContain(activeBgColor);
    //circle 3
    expect(element[5].className).toContain(activeBgColor);
    expect(element[5].className).toContain(activeTextColor);
  });
});
