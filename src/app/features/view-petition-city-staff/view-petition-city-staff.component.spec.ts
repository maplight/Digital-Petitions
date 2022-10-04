import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ApproveDialogModule } from './approve-dialog/approve-dialog.module';
import { CualifiedBoxModule } from './cualified-box/cualified-box.module';
import { CurrentResultCityStaffModule } from './current-result-city-staff/current-result-city-staff.module';
import { DenyAlertModule } from './deny-alert/deny-alert.module';
import { NewBoxModule } from './new-box/new-box.module';
import { ViewPetitionCityStaffRoutingModule } from './view-petition-city-staff-routing.module';

import { ViewPetitionCityStaffComponent } from './view-petition-city-staff.component';

describe('ViewPetitionCityStaffComponent', () => {
  let component: ViewPetitionCityStaffComponent;
  let fixture: ComponentFixture<ViewPetitionCityStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPetitionCityStaffComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatProgressBarModule,
        PetitionViewModule,
        CurrentResultCityStaffModule,
        ReturnLinkModule,
        RouterModule,
        ViewPetitionCityStaffRoutingModule,
        NewBoxModule,
        CualifiedBoxModule,
        ApproveDialogModule,
        DenyAlertModule,
        DialogResultModule,
        ErrorMsgModule,
        LoadingBarModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPetitionCityStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
const dialogMock = {
  close: () => {},
};
