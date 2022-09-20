import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { EditPetitionCandidateModule } from './edit-petition-candidate/edit-petition-candidate.module';
import { EditPetitionIssueModule } from './edit-petition-issue/edit-petition-issue.module';
import { EditPetitionRoutingModule } from './edit-petition-routing.module';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  of,
  partition,
  ReplaySubject,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { EditPetitionComponent } from './edit-petition.component';
import { EditResultPetitionModule } from './edit-result-petition/edit-result-petition.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { Result } from 'src/app/shared/models/exports';
import { PetitionService } from 'src/app/logic/petition/petition.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';

describe('EditPetitionComponent', () => {
  let component: EditPetitionComponent;
  let fixture: ComponentFixture<EditPetitionComponent>;
  let _getCommitteePetitionService: GetCommitteePetitionService;

  const mockedIssue: IssuePetition = {
    __typename: 'IssuePetition',
    PK: '',
    createdAt: '',
    detail: 'Text',
    owner: '',
    signatures: {
      __typename: 'SignatureConnection',
      items: [],
      token: undefined,
    },
    status: PetitionStatus.NEW,
    title: 'Title',
    type: PetitionType.ISSUE,
    updatedAt: '',
    version: 0,
  };

  class MockedGetCommitteePetitionService {
    public error$: Observable<string | undefined>;
    public success$: Observable<ResponsePetition | undefined>;
    public loading$: Observable<boolean>;
    public result$: Observable<Result<ResponsePetition>>;
    private submit$: ReplaySubject<string> = new ReplaySubject();

    constructor() {
      this.result$ = this.submit$.pipe(
        exhaustMap((_) =>
          of({
            result: { dataIssue: mockedIssue },
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
          map((v) => true),
          tap(() => console.log('start'))
        ),
        end$.pipe(
          map((v) => false),
          tap(() => console.log('end'))
        )
      ).pipe(shareReplay(1));
    }
    ngOnDestroy(): void {
      this.submit$.complete();
    }

    getPetition(id: string) {
      this.submit$.next(id);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPetitionComponent],
      imports: [
        CommonModule,
        RouterModule,
        EditPetitionCandidateModule,
        EditPetitionIssueModule,
        EditPetitionRoutingModule,
        ReturnLinkModule,
        MatDialogModule,
        BasicModalModule,
        EditResultPetitionModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        LoadingBarModule,
        ErrorMsgModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        EditPetitionComponent,
        {
          provide: GetCommitteePetitionService,
          useClass: MockedGetCommitteePetitionService,
        },
      ],
    }).compileComponents();

    component = TestBed.inject(EditPetitionComponent);
    _getCommitteePetitionService = TestBed.inject(GetCommitteePetitionService);
    fixture = TestBed.createComponent(EditPetitionComponent);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('issue', () => {
    _getCommitteePetitionService.success$.subscribe((_) => {
      const issue_element = fixture.debugElement.nativeElement.querySelectorAll(
        'dp-edit-petition-issue'
      );

      fixture.detectChanges();
      expect(issue_element.length).toEqual(1);
    });
    fixture.detectChanges();
  });
});
