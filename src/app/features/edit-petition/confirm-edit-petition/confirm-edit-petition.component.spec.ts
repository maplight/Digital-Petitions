import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';

import { ConfirmEditPetitionComponent } from './confirm-edit-petition.component';

describe('ConfirmEditPetitionComponent', () => {
  let component: ConfirmEditPetitionComponent;
  let fixture: ComponentFixture<ConfirmEditPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmEditPetitionComponent],
      imports: [
        CommonModule,
        BasicAlertModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEditPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that the "dp-basic-alert" component exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('dp-basic-alert');
    expect(element).toBeTruthy();
  });

  it('evaluates that there are three buttons', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(3);
  });

  it('check that the title exists', () => {
    const element = fixture.debugElement.nativeElement.querySelectorAll('span');
    expect(element[0].textContent).toEqual(
      'Do you want to submit your changes?'
    );
  });

  it('check that the alert message exists', () => {
    const element = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element[0].textContent).toEqual(
      'Once this has been Submitted it can not be undone.'
    );
  });
});
