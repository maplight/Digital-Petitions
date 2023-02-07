import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { SignPetitionRoutingModule } from './sign-petition-routing.module';

import { SignPetitionComponent } from './sign-petition.component';
import { SignThisPetitionModule } from './sign-this-petition/sign-this-petition.module';
import { VerifySignModule } from './verify-sign/verify-sign.module';

describe('SignPetitionComponent', () => {
  let component: SignPetitionComponent;
  let fixture: ComponentFixture<SignPetitionComponent>;
  let _getPublicPetitionService: GetPublicPetitionService;
  const activatedRoute = new ActivatedRouteStub();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignPetitionComponent],
      imports: [
        CommonModule,
        SignPetitionRoutingModule,
        ReturnLinkModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        PetitionViewModule,
        SignThisPetitionModule,
        VerifySignModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    })
      .overrideComponent(SignPetitionComponent, {
        set: {
          providers: [
            {
              provide: GetPublicPetitionService,
              useClass: MockedGetPublicPetitionService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    activatedRoute.setParamMap({ id: mockedIssue.PK });
    fixture = TestBed.createComponent(SignPetitionComponent);
    component = fixture.componentInstance;
    _getPublicPetitionService = fixture.debugElement.injector.get(
      GetPublicPetitionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading bar when the petition is loading', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_getPublicPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the petition view element when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-petition-view');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show the "sign this petition" element when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll(
        'dp-sign-this-petition'
      );

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show four buttons when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpEditPetitionIssue.length).toBe(4);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_getPublicPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getPublicPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_getPublicPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getPublicPetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
class MockedGetPublicPetitionService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<ResponsePetition | undefined> {
    return of({ dataIssue: mockedIssue });
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  getPetition(id: string): void {}
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
