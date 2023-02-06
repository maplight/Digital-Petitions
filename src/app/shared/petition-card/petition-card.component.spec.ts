import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { CutModule } from 'src/app/pipes/cut/cut.module';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';
import { PetitionTypeModule } from 'src/app/pipes/petition-type/petition-type.module';
import { BasicCardModule } from '../basic-card/basic-card.module';

import { PetitionCardComponent } from './petition-card.component';

describe('PetitionCardComponent', () => {
  let component: PetitionCardComponent;
  let fixture: ComponentFixture<PetitionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetitionCardComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        CutModule,
        RouterModule,
        PetitionTypeModule,
        PetitionStatusModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(PetitionCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a issue type petition when data container a issue petition', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        detail: '',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        title: '',
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
      },
    };
    component.showType = true;
    component.showStatus = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p')[0].textContent
    ).toEqual(' Issue ');
  });

  it('should show a candidate petition type when data container a candidate petition', () => {
    component.data = {
      dataCandidate: {
        __typename: 'CandidatePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.CANDIDATE,
        version: 0,
        address: { __typename: 'AddressData', address: '', state: '' },
        name: '',
        office: '',
        party: '',
      },
    };
    component.showStatus = true;
    component.showType = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p')[0].textContent
    ).toEqual(' Candidate ');
  });

  it('should show the petition status when showStatus variable is true', () => {
    component.data = {
      dataCandidate: {
        __typename: 'CandidatePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.CANDIDATE,
        version: 0,
        address: { __typename: 'AddressData', address: '', state: '' },
        name: '',
        office: '',
        party: '',
      },
    };
    component.showStatus = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p')[0].textContent
    ).toEqual(' Awaiting approval ');
  });

  it('should not show the petition status when showStatus variable is false', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
        detail: '',
        title: '',
      },
    };
    component.showStatus = false;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p').length
    ).toEqual(1);
  });

  it('should show the "show more" option when the string length in details property is greater than character value received', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
        detail: '12345678901234567890',
        title: 'title',
      },
    };
    component.characters = 10;
    component.linkText = 'example';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('span')[0].textContent
    ).toEqual('example');
  });

  it('should show the "progress bar" when the showSignatures flag is "true"', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
        detail: '12345678901234567890',
        title: 'title',
        signatureSummary: {
          __typename: 'SignatureSummary',
          approved: 0,
          required: 100,
        },
      },
    };
    component.characters = 30;
    component.linkText = 'example';
    component.showSignature = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-progress-bar')
        .length
    ).toEqual(1);
  });
  it('should not show the "progress bar" when the showSignatures flag is "false"', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
        detail: '12345678901234567890',
        title: 'title',
        signatureSummary: {
          __typename: 'SignatureSummary',
          approved: 0,
          required: 100,
        },
      },
    };
    component.characters = 30;
    component.linkText = 'example';
    component.showSignature = false;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-progress-bar')
        .length
    ).toEqual(0);
  });

  it('should not show the "show more" option when the string length in details property is less than character value received', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        owner: '',
        PK: '',
        signatures: { __typename: 'SignatureConnection', items: [] },
        status: PetitionStatus.NEW,
        updatedAt: '00/00/0000',
        type: PetitionType.ISSUE,
        version: 0,
        detail: '12345678901234567890',
        title: 'title',
      },
    };
    component.characters = 30;
    component.linkText = 'example';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('span').length
    ).toEqual(3);
  });
});
