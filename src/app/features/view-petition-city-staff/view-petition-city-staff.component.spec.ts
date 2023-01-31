import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';
import { GetStaffPetitionService } from 'src/app/logic/petition/get-staff-petition.service';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ApproveDialogModule } from './approve-dialog/approve-dialog.module';
import { CualifiedBoxModule } from './qualified-box/qualified-box.module';
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
  const activatedRoute = new ActivatedRouteStub({ id: 'id' });

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
    })
      .overrideComponent(ViewPetitionCityStaffComponent, {
        set: {
          providers: [
            {
              provide: MatDialog,
              useValue: dialogMock,
            },
            {
              provide: ActivatedRoute,
              useValue: activatedRoute,
            },
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
  //loading petition
  it('should show the loading bar when the petition is loading', () => {
    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  //loading approve
  it('should show the loading bar when the approve proccess is loading', () => {
    component.ngOnInit();
    spyOnProperty(_approvePetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the approve proccess is not loading', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  //loading deny
  it('should show the loading bar when the deny proccess is loading', () => {
    spyOnProperty(_denyPetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should call denyPetition function when deny button is clicked and afterClosed method return a valid value', () => {
    let spyFunc = spyOn(_denyPetitionService, 'denyPetition');
    spyOn(mockedDialogRef, 'afterClosed').and.returnValue(of('success'));
    fixture.detectChanges();
    component.denyAlert({ dataIssue: mockedIssue });
    expect(spyFunc).toHaveBeenCalledOnceWith({
      expectedVersion: mockedIssue.version,
      PK: mockedIssue.PK,
    });
  });

  it('should call denyPetition function when deny button is clicked and afterClosed method return undefined', () => {
    let spyFunc = spyOn(dialogMock, 'closeAll');
    spyOn(mockedDialogRef, 'afterClosed').and.returnValue(of(undefined));
    fixture.detectChanges();
    component.denyAlert({ dataIssue: mockedIssue });
    expect(spyFunc).toHaveBeenCalled();
  });

  it('should not show the loading bar if the deny proccess is not loading', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should call "open" function in MatDialog when ApprovePetitionService emit a successful response', () => {
    let spyFunc = spyOn(dialogMock, 'open');
    let modifiedMockedIssue = mockedIssue;
    modifiedMockedIssue.status = PetitionStatus.REJECTED;

    spyOnProperty(_getPetitionService, 'success$', 'get').and.returnValue(
      of({ dataIssue: mockedIssue })
    );

    spyOnProperty(_denyPetitionService, 'success$', 'get').and.returnValue(
      of({ dataIssue: modifiedMockedIssue })
    );

    fixture.detectChanges();

    expect(spyFunc).toHaveBeenCalled();
  });

  it('should show the petition view element when a successful response is received', () => {
    spyOnProperty(_getPetitionService, 'success$', 'get').and.returnValue(
      of({ dataIssue: mockedIssue })
    );
    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-petition-view');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show the "New Box" element when a successful response is received and petition status is "NEW"', () => {
    let modifiedMockedIssue = mockedIssue;
    modifiedMockedIssue.status = PetitionStatus.NEW;
    spyOnProperty(_getPetitionService, 'success$', 'get').and.returnValue(
      of({ dataIssue: modifiedMockedIssue })
    );
    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-new-box');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show the "Cualified Box" element when a successful response is received and petition status is diferent of "NEW"', () => {
    let modifiedMockedIssue = mockedIssue;
    modifiedMockedIssue.status = PetitionStatus.CANCELED;
    spyOnProperty(_getPetitionService, 'success$', 'get').and.returnValue(
      of({ dataIssue: modifiedMockedIssue })
    );
    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-cualified-box');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_getPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_getPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getPetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
const dialogMock = {
  close: () => {},
  open: () => mockedDialogRef,
  closeAll(): Observable<string | undefined> {
    return new Observable();
  },
};
const mockedDialogRef = {
  afterClosed(): Observable<string | undefined> {
    return new Observable();
  },
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
const mockedIssue: IssuePetition = {
  __typename: 'IssuePetition',
  PK: '1',
  createdAt: '',
  detail: 'Text',
  owner: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.NEW,
  title: 'Title',
  type: PetitionType.ISSUE,
  updatedAt: '',
  version: 0,
};
