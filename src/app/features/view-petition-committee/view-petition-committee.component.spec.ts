import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { AlertWithdrawlPetitionModule } from './alert-withdrawl-petition/alert-withdrawl-petition.module';
import { ConfirmWithdrawlPetitionModule } from './confirm-withdrawl-petition/confirm-withdrawl-petition.module';
import { CurrentResultModule } from './current-result/current-result.module';
import { ViewPetitionCommitteeRoutingModule } from './view-petition-committee-routing.module';

import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';
import { WithdrawlResultModule } from './withdrawl-result/withdrawl-result.module';

describe('ViewPetitionCommitteeComponent', () => {
  let component: ViewPetitionCommitteeComponent;
  let fixture: ComponentFixture<ViewPetitionCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPetitionCommitteeComponent],
      imports: [
        CommonModule,
        ViewPetitionCommitteeRoutingModule,
        MatProgressBarModule,
        MatIconModule,
        PetitionViewModule,
        ReturnLinkModule,
        CurrentResultModule,
        MatButtonModule,
        AlertWithdrawlPetitionModule,
        ConfirmWithdrawlPetitionModule,
        MatDialogModule,
        RouterTestingModule,
        WithdrawlResultModule,
        PetitionStatusModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPetitionCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toEqual(2);
  });

  it('should create', () => {
    //return link
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    // un petition card
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    //un current result
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    //si es new decir awaiting aproval
    expect(component).toBeTruthy();
  });
});
