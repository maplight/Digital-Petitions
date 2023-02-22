import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VoterRecordMatch, VoterRecordMatchInput } from 'src/app/core/api/API';
import { State } from 'src/app/core/states';
import { VoterRecordMatchService } from 'src/app/logic/petition/voter-record-match.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

import { SignThisPetitionComponent } from './sign-this-petition.component';

describe('SignThisPetitionComponent', () => {
  let component: SignThisPetitionComponent;
  let fixture: ComponentFixture<SignThisPetitionComponent>;
  let _getVoterRecordMatchService: VoterRecordMatchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignThisPetitionComponent],
      imports: [
        CommonModule,
        MatProgressBarModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(SignThisPetitionComponent, {
        set: {
          providers: [
            {
              provide: VoterRecordMatchService,
              useClass: MockedVoterRecordMatchService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(SignThisPetitionComponent);
    component = fixture.componentInstance;
    _getVoterRecordMatchService = fixture.debugElement.injector.get(
      VoterRecordMatchService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that cancelEvent emits the appropriate value when the cancel function is called', () => {
    component.ngOnInit();

    component.cancelEvent.asObservable().subscribe((data) => {
      expect(data).toEqual('sign');
    });
    component.cancel('sign');
  });

  it('evaluates that submitEvent emits the proper value when submit emits', () => {
    component.submitEvent.asObservable().subscribe((data) => {
      expect(data).toEqual({
        __typename: 'VoterRecordMatch',
        address: '',
        city: '',
        fullName: '',
        methods: [''],
        state: '',
        token: '',
        zipCode: '',
      });
    });
    component.ngOnInit();
    spyOnProperty(
      _getVoterRecordMatchService,
      'success$',
      'get'
    ).and.returnValue(
      of({
        __typename: 'VoterRecordMatch',
        address: '',
        city: '',
        fullName: '',
        methods: [''],
        state: '',
        token: '',
        zipCode: '',
      })
    );
  });

  it('should call getVoterRecordMatch function when submit button is clicked and form is valid', () => {
    component.ngOnInit();
    const getPetitionsSpy = spyOn(
      _getVoterRecordMatchService,
      'getVoterRecordMatch'
    );
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'some',
      city: 'some',
      fullName: 'some',
      methods: [],
      state: 'AL',
      zipCode: 'some',
    };
    component.ngOnChanges();
    component.submit();

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith({
      address: 'some',
      city: 'some',
      fullName: 'some',
      state: 'AL',
      zipCode: 'some',
    });
  });

  it('should show the loading bar when the petition is loading', () => {
    component.ngOnInit();
    spyOnProperty(
      _getVoterRecordMatchService,
      'loading$',
      'get'
    ).and.returnValue(of(true));
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
});
class MockedVoterRecordMatchService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<VoterRecordMatch | undefined> {
    return of({
      __typename: 'VoterRecordMatch',
      address: '',
      city: '',
      fullName: '',
      methods: [''],
      state: '',
      token: '',
      zipCode: '',
    });
  }

  public get loading$(): Observable<boolean> {
    return of(false);
  }

  getVoterRecordMatch(value: VoterRecordMatchInput) {}
}
