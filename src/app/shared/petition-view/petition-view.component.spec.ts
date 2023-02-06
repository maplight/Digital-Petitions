import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { CutModule } from 'src/app/pipes/cut/cut.module';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';
import { PetitionTypeModule } from 'src/app/pipes/petition-type/petition-type.module';
import { BasicCardModule } from '../basic-card/basic-card.module';

import { PetitionViewComponent } from './petition-view.component';

describe('PetitionCardComponent', () => {
  let component: PetitionViewComponent;
  let fixture: ComponentFixture<PetitionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetitionViewComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        CutModule,
        PetitionTypeModule,
        PetitionStatusModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetitionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    component.showStatus = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p')[1].textContent
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
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('p')[1].textContent
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
    ).toEqual('Awaiting approval');
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
    ).toEqual(2);
  });
});
