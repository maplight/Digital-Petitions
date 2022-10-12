import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetStaffPetitionService } from 'src/app/logic/petition/get-staff-petition.service';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
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
  let _getPetitionService: GetStaffPetitionService;
  let _approvePetitionService: ApprovePetitionService;
  let _denyPetitionService: DenyPetitionService;

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
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ViewPetitionCityStaffComponent, {
        set: {
          providers: [
            {
              provide: GetStaffPetitionService,
              useClass: MockedGetPetitionService,
            },
            {
              provide: ApprovePetitionService,
              useClass: MockedApprovePetitionService,
            },
            {
              provide: DenyPetitionService,
              useClass: MockedDenyPetitionService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ViewPetitionCityStaffComponent);
    component = fixture.componentInstance;
    _getPetitionService = fixture.debugElement.injector.get(
      GetStaffPetitionService
    );
    _approvePetitionService = fixture.debugElement.injector.get(
      ApprovePetitionService
    );
    _denyPetitionService =
      fixture.debugElement.injector.get(DenyPetitionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
const dialogMock = {
  close: () => {},
};
class MockedGetPetitionService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<ResponsePetition | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  getPetition(id: string) {}
}

class MockedApprovePetitionService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  approvePetition(id: string[]) {}
}

class MockedDenyPetitionService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  denyPetition(id: string[]) {}
}
