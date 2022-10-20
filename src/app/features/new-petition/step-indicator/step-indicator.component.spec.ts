import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';

import { StepIndicatorComponent } from './step-indicator.component';

describe('StepIndicatorComponent', () => {
  let component: StepIndicatorComponent;
  let fixture: ComponentFixture<StepIndicatorComponent>;

  let _stepIndicatorService: StepIndicatorService;

  class MockStepIndicatorService {
    public get _publicCurrentStep$(): Observable<
      'type' | 'issue' | 'candidate' | 'result'
    > {
      return new Observable();
    }

    setCurrentStep(step: 'type' | 'issue' | 'candidate' | 'result') {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepIndicatorComponent],
    })
      .overrideComponent(StepIndicatorComponent, {
        set: {
          providers: [
            {
              provide: StepIndicatorService,
              useClass: MockStepIndicatorService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(StepIndicatorComponent);
    component = fixture.componentInstance;
    _stepIndicatorService =
      fixture.debugElement.injector.get(StepIndicatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates the colors of the elements in the "type" step', () => {
    spyOnProperty(_stepIndicatorService, '_publicCurrentStep$').and.returnValue(
      of('type')
    );
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    fixture.detectChanges();
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');

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
    spyOnProperty(_stepIndicatorService, '_publicCurrentStep$').and.returnValue(
      of('issue')
    );
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    fixture.detectChanges();
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('issue');

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
    spyOnProperty(_stepIndicatorService, '_publicCurrentStep$').and.returnValue(
      of('candidate')
    );
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    fixture.detectChanges();
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('candidate');

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
    spyOnProperty(_stepIndicatorService, '_publicCurrentStep$').and.returnValue(
      of('result')
    );
    const activeBgColor: string = 'bg-[#ECF0FF]';
    const activeTextColor: string = 'text-[#2D5BFF]';
    const inActiveBgColor: string = 'bg-[#EFEFEF]';
    const inActiveTextColor: string = 'text-[#8A8A8A]';
    fixture.detectChanges();
    const element: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('div');
    _stepIndicatorService.setCurrentStep('result');

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
