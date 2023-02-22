import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { CutModule } from 'src/app/pipes/cut/cut.module';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';

import { EditResultPetitionComponent } from './edit-result-petition.component';

describe('EditResultPetitionComponent', () => {
  let component: EditResultPetitionComponent;
  let fixture: ComponentFixture<EditResultPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditResultPetitionComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatButtonModule,
        RouterModule,
        CutModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditResultPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the data corresponding to a petition of type candidate when receiving an object of type candidate', () => {
    component.data = {
      dataCandidate: {
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
      },
    };
    fixture.detectChanges();
    expect();
    const element_p = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element_p.length).toBe(10);
    expect(element_p[1].textContent).toContain('May');
    expect(element_p[3].textContent).toContain('Office-1');
    expect(element_p[5].textContent).toContain('Party-1');
    const element_span =
      fixture.debugElement.nativeElement.querySelectorAll('span');
    expect(element_span.length).toBe(10);
    expect(element_span[0].textContent).toContain('Address: Some Site');
    expect(element_span[1].textContent).toContain('Number: 12');
    expect(element_span[2].textContent).toContain('City: Some city');
    expect(element_span[3].textContent).toContain('State: AL');
    expect(element_span[4].textContent).toContain('Zip Code: 000000');
  });

  it('should display the data corresponding to a petition of type issue when receiving an object of type issue', () => {
    component.data = {
      dataIssue: {
        __typename: 'IssuePetition',
        createdAt: '00/00/0000',
        PK: '',
        detail: 'Text',
        title: 'Title',
        owner: '',
        signatures: {
          __typename: 'SignatureConnection',
          items: [],
          token: undefined,
        },
        status: PetitionStatus.ACTIVE,
        type: PetitionType.CANDIDATE,
        updatedAt: '',
        version: 0,
      },
    };
    fixture.detectChanges();
    expect();
    const element_p = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element_p.length).toBe(4);
    expect(element_p[1].textContent).toContain(' Title ');
    expect(element_p[3].textContent).toContain(' Text ');
  });
});
