import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  of,
  partition,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import {
  EditIssuePetitionInput,
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { EditPetitionIssueService } from 'src/app/logic/petition/edit-petition-issue.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { Result } from 'src/app/shared/models/exports';

import { EditPetitionIssueComponent } from './edit-petition-issue.component';

describe('EditPetitionIssueComponent', () => {
  let component: EditPetitionIssueComponent;
  let _editPetitionIssueService: EditPetitionIssueService;
  let fixture: ComponentFixture<EditPetitionIssueComponent>;
  const mockedIssue: IssuePetition = {
    __typename: 'IssuePetition',
    PK: '',
    createdAt: '',
    detail: '',
    owner: '',
    signatures: {
      __typename: 'SignatureConnection',
      items: [],
      token: undefined,
    },
    status: PetitionStatus.ACTIVE,
    title: '',
    type: PetitionType.ISSUE,
    updatedAt: '',
    version: 0,
  };
  class MockedEditPetitionIssueService {
    public error$: Observable<string | undefined>;
    public success$: Observable<IssuePetition | undefined>;
    public loading$: Observable<boolean>;
    public result$: Observable<Result<IssuePetition>>;
    private submit$: Subject<EditIssuePetitionInput> = new Subject();

    constructor() {
      this.result$ = this.submit$.pipe(
        exhaustMap((_) =>
          of({
            result: mockedIssue,
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
        this.submit$.pipe(
          map((_v) => true),
          tap(() => console.log('start'))
        ),
        end$.pipe(
          map((_v) => false),
          tap(() => console.log('end'))
        )
      ).pipe(shareReplay(1));
    }
    ngOnDestroy(): void {
      this.submit$.complete();
    }

    editIssuePetition(value: EditIssuePetitionInput) {
      this.submit$.next(value);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPetitionIssueComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BasicCardModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        EditPetitionIssueComponent,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        EditPetitionIssueComponent,
        {
          provide: EditPetitionIssueService,
          useClass: MockedEditPetitionIssueService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPetitionIssueComponent);
    _editPetitionIssueService = TestBed.inject(EditPetitionIssueService);
    component = TestBed.inject(EditPetitionIssueComponent);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that the form loads the data by default', () => {
    component.formData = {
      dataIssue: mockedIssue,
    };
    component.ngOnChanges();
    expect(component.formGroup.value).toEqual(
      Object({
        title: '',
        text: '',
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
      dataIssue: mockedIssue,
    };
    component.ngOnChanges();

    fixture.detectChanges();
    component._submitEvent.asObservable().subscribe((data) => {
      expect(data).toEqual(mockedIssue);
    });

    _editPetitionIssueService.editIssuePetition({
      expectedVersion: 0,
      PK: '',
    });
  });
});
