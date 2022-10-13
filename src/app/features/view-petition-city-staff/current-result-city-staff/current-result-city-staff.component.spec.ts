import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';

import { CurrentResultCityStaffComponent } from './current-result-city-staff.component';

describe('CurrentResultCityStaffComponent', () => {
  let component: CurrentResultCityStaffComponent;
  let fixture: ComponentFixture<CurrentResultCityStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentResultCityStaffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentResultCityStaffComponent);
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
    expect(element[4].textContent).toEqual('N/A');
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
          deadline: '06/22/1993',
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
    expect(element[5].textContent).toEqual(' 100 ');
    expect(element[7].textContent).toEqual(' 1000 ');
    expect(element[9].textContent).toEqual(' Jun 22, 1993 ');
    expect(element[3].textContent).toEqual(' 150 ');
  });
});
