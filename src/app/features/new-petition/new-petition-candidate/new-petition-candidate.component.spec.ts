import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { NewPetitionCandidateService } from 'src/app/logic/petition/new-petition-candidate.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { Result } from 'src/app/shared/models/exports';

import { NewPetitionCandidateComponent } from './new-petition-candidate.component';

describe('NewPetitionCandidateComponent', () => {
  let component: NewPetitionCandidateComponent;
  let fixture: ComponentFixture<NewPetitionCandidateComponent>;
  let _fb: FormBuilder = new FormBuilder();

  let NewPetitionCandidateServiceStub: Partial<NewPetitionCandidateService>;
  NewPetitionCandidateServiceStub = {
    error$: new ReplaySubject<string | undefined>(),
    success$: new Observable<CandidatePetition | undefined>(),
    loading$: new Observable<boolean>(),
    result$: new Observable<Result<CandidatePetition>>(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPetitionCandidateComponent],
      imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
        BasicCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: NewPetitionCandidateService,
          useValue: NewPetitionCandidateServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPetitionCandidateComponent);
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
      name: ['', [Validators.required]],
      office: ['', [Validators.required]],
      party: ['', [Validators.required]],
      address: _fb.group({
        address: ['', [Validators.required]],
        number: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }),
    });
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeFalse();
  });

  it('evaluate if the form validation is true by giving it correct data', () => {
    component.formGroup = _fb.group({
      name: ['May', [Validators.required]],
      office: ['Office-1', [Validators.required]],
      party: ['Party-1', [Validators.required]],
      address: _fb.group({
        address: ['Some street', [Validators.required]],
        number: [''],
        city: ['Some City', [Validators.required]],
        state: ['AL', [Validators.required]],
        zipCode: ['000000', [Validators.required]],
      }),
    });
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeTrue();
  });
});
