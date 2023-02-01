import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IssuePetition } from 'src/app/core/api/API';
import { NewPetitionIssueService } from 'src/app/logic/petition/new-petition-issue.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { Result } from 'src/app/shared/models/exports';
import { StepIndicatorModule } from '../step-indicator/step-indicator.module';

import { NewPetitionIssueComponent } from './new-petition-issue.component';

describe('NewPetitionIssueComponent', () => {
  let component: NewPetitionIssueComponent;
  let fixture: ComponentFixture<NewPetitionIssueComponent>;
  let _fb: FormBuilder = new FormBuilder();
  let NewPetitionIssueServiceStub: Partial<NewPetitionIssueService>;
  NewPetitionIssueServiceStub = {
    error$: new Observable<string | undefined>(),
    success$: new Observable<IssuePetition | undefined>(),
    loading$: new Observable<boolean>(),
    result$: new Observable<Result<IssuePetition>>(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPetitionIssueComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        StepIndicatorModule,
        MatButtonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorMsgModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: NewPetitionIssueService,
          useValue: NewPetitionIssueServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPetitionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluate that the form is loaded', () => {
    const element = fixture.debugElement.nativeElement.querySelector('form');
    expect(element).toBeTruthy();
  });

  it('evaluate if the form validation is false by giving it wrong data', () => {
    component.formGroup = _fb.group({
      title: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    });
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeFalse();
  });

  it('evaluate if the form validation is true by giving it correct data', () => {
    component.formGroup = _fb.group({
      title: ['title', [Validators.required]],
      detail: ['text', [Validators.required]],
    });
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeTrue();
  });
});
