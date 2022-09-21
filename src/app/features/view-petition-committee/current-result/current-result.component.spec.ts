import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';

import { CurrentResultComponent } from './current-result.component';

describe('CurrentResultComponent', () => {
  let component: CurrentResultComponent;
  let fixture: ComponentFixture<CurrentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates to show the signature value if the petition status is NEW', () => {
    component.data = {
      dataIssue: {
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
        status: PetitionStatus.NEW,
        title: '',
        type: PetitionType.ISSUE,
        updatedAt: '',
        version: 0,
      },
    };
    component.ngOnChanges();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element[4].textContent).toEqual('Pending');
  });

  it('evaluates to show the signature values if the petition status is different from NEW', () => {
    component.data = {
      dataIssue: {
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
        signatureSummary: {
          __typename: 'SignatureSummary',
          approved: 100,
          required: 1000,
          submitted: 150,
          deadline: '00/00/0000',
        },
        status: PetitionStatus.ACTIVE,
        title: '',
        type: PetitionType.ISSUE,
        updatedAt: '',
        version: 0,
      },
    };
    component.ngOnChanges();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element[4].textContent).toEqual(' 100 ');
    expect(element[6].textContent).toEqual(' 1000 ');
    expect(element[8].textContent).toEqual(' 00/00/0000 ');
    expect(element[2].textContent).toEqual(' 150 ');
  });
});
