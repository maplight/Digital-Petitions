import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { NewPetitionCandidateModule } from './new-petition-candidate/new-petition-candidate.module';
import { NewPetitionIssueModule } from './new-petition-issue/new-petition-issue.module';
import { NewPetitionRoutingModule } from './new-petition-routing.module';

import { NewPetitionComponent } from './new-petition.component';
import { ResultPetitionModule } from './result-petition/result-petition.module';
import { SelectTypePetitionModule } from './select-type-petition/select-type-petition.module';
import { StepIndicatorModule } from './step-indicator/step-indicator.module';
import { DebugElement } from '@angular/core';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('NewPetitionComponent', () => {
  let component: NewPetitionComponent;
  let fixture: ComponentFixture<NewPetitionComponent>;
  let _de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPetitionComponent],
      imports: [
        CommonModule,
        NewPetitionRoutingModule,
        BasicCardModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        NewPetitionIssueModule,
        RouterModule,
        StepIndicatorModule,
        SelectTypePetitionModule,
        ResultPetitionModule,
        NewPetitionCandidateModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ], //,providers:[{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NewPetitionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('evaluate that the title "Create a petition" exists', () => {
    const title = fixture.debugElement.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Create a petition');
  });

  it('evaluate that dp-basic-card component exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('dp-basic-card');
    expect(element).toBeTruthy();
  });

  it('evaluate that Cancel button element exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);
    expect(element[0].textContent).toContain('Cancel');
  });

  it('evaluate that Continue button element exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);

    expect(element[1].textContent).toContain('Continue');
  });

  it('evaluate that type selector component is default loaded', () => {
    const element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual(
      ' Choose the type of petition you will be submitting '
    );
  });

  it('evaluate that "petition result" component is loaded at send a candidate type petition to backend', () => {
    component.submitCandidate({
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
      name: '',
      office: '',
      owner: '',
      party: '',
      signatures: {
        __typename: 'SignatureConnection',
        items: [],
        token: undefined,
      },
      status: PetitionStatus.ACTIVE,
      type: PetitionType.CANDIDATE,
      updatedAt: '',
      version: 0,
    });
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual(
      ' Your petition has been submitted to the city for review. A confirmation email has been sent to you. '
    );
  });

  it('evaluate that "Return Home" button element exists in petition result view', () => {
    component.submitCandidate({
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
      name: '',
      office: '',
      owner: '',
      party: '',
      signatures: {
        __typename: 'SignatureConnection',
        items: [],
        token: undefined,
      },
      status: PetitionStatus.ACTIVE,
      type: PetitionType.CANDIDATE,
      updatedAt: '',
      version: 0,
    });
    fixture.detectChanges();
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(1);
    expect(element[0].textContent).toContain('Return Home');
  });

  it('evaluate that Back button element exists in new issue petition view', () => {
    component.submitType('Issue');
    fixture.detectChanges();
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);
    expect(element[0].textContent).toContain('Back');
  });

  it('evaluate that Back button element exists in new candidate petition view', () => {
    component.submitType('Candidate');
    fixture.detectChanges();
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);
    expect(element[0].textContent).toContain('Back');
  });

  it('evaluate that the "new-issue-petition" component is loaded when selecting the option to create a new issue-type petition', () => {
    component.submitType('Issue');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual(
      ' Please fill out all fields to submit your issue petition to the city. '
    );
  });

  it('evaluate that the "new-candidate-petition" component is loaded when selecting the option to create a new candidate-type petition', () => {
    component.submitType('Candidate');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual(
      'Please fill out all fields to submit your candidate for ballot petition.'
    );
  });
});
