import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CandidatePetition,
  EditCandidatePetitionInput,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { ConfirmEditPetitionModule } from '../confirm-edit-petition/confirm-edit-petition.module';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  shareReplay,
  Subject,
  tap,
  of,
} from 'rxjs';
import { EditPetitionCandidateComponent } from './edit-petition-candidate.component';
import { Result } from 'src/app/shared/models/exports';
import { EditPetitionCandidateService } from 'src/app/logic/petition/edit-petition-candidate.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { editCandidatePetition } from 'src/graphql/mutations';

describe('EditPetitionCandidateComponent', () => {
  let component: EditPetitionCandidateComponent;
  let _editPetitionCandidateService: EditPetitionCandidateService;
  let fixture: ComponentFixture<EditPetitionCandidateComponent>;
  const mockedCandidate: CandidatePetition = {
    __typename: 'CandidatePetition',
    address: {
      __typename: 'AddressData',
      address: 'Some Site',
      state: 'AL',
      city: 'Some city',
      number: '12',
      zipCode: '000000',
    },
    createdAt: '00/00/0000',
    PK: '',
    name: 'May',
    office: 'Office-1',
    owner: '',
    party: 'Party-1',
    signatures: {
      __typename: 'SignatureConnection',
      items: [],
      token: undefined,
    },
    status: PetitionStatus.ACTIVE,
    type: PetitionType.CANDIDATE,
    updatedAt: '',
    version: 0,
  };
  class MockedEditPetitionCandidateService {
    public error$: Observable<string | undefined>;
    public success$: Observable<CandidatePetition | undefined>;
    public loading$: Observable<boolean>;
    public result$: Observable<Result<CandidatePetition>>;
    private submit$: Subject<EditCandidatePetitionInput> = new Subject();

    constructor() {
      this.result$ = this.submit$.pipe(
        exhaustMap((_) =>
          of({
            result: mockedCandidate,
          })
        ),
        shareReplay(1)
      );

      const [success$, error$] = partition(this.result$, (value) =>
        value.result ? true : false
      );

      this.success$ = success$.pipe(
        map((value) => value.result),
        shareReplay(1)
      );

      this.error$ = error$.pipe(
        map((value) => value.error),
        shareReplay(1)
      );

      const end$ = merge(this.success$, this.error$);

      this.loading$ = merge(
        this.submit$.pipe(map((_v) => true)),
        end$.pipe(map((_v) => false))
      ).pipe(shareReplay(1));
    }
    ngOnDestroy(): void {
      this.submit$.complete();
    }

    editCandidatePetition(value: EditCandidatePetitionInput) {
      this.submit$.next(value);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPetitionCandidateComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ConfirmEditPetitionModule,
        MatDialogModule,
        BasicModalModule,
        BrowserAnimationsModule,
        LoadingBarModule,
        ErrorMsgModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        EditPetitionCandidateComponent,
        {
          provide: EditPetitionCandidateService,
          useClass: MockedEditPetitionCandidateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPetitionCandidateComponent);
    _editPetitionCandidateService = TestBed.inject(
      EditPetitionCandidateService
    );
    component = TestBed.inject(EditPetitionCandidateComponent);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that the form loads the data by default', () => {
    component.formData = {
      dataCandidate: mockedCandidate,
    };
    component.ngOnChanges();
    expect(component.formGroup.value).toEqual(
      Object({
        office: 'Office-1',
        party: 'Party-1',
        address: 'Some Site',
        aptNumber: '12',
        city: 'Some city',
        state: 'AL',
        zipCode: '000000',
      })
    );
  });

  it('evaluates what "cancelEvent" emits when the cancel option is selected', () => {
    component._cancelEvent.asObservable().subscribe((_) => {
      expect(true).toBeTrue();
    });
    component.cancel();
  });

  it('evaluates what "submit Event" emits when a successful response is received from the service', () => {
    component.formData = {
      dataCandidate: mockedCandidate,
    };
    component.ngOnChanges();

    fixture.detectChanges();
    component._submitEvent.asObservable().subscribe((data) => {
      expect(data).toEqual(mockedCandidate);
    });

    _editPetitionCandidateService.editCandidatePetition({
      expectedVersion: 0,
      PK: '',
    });
  });
});
