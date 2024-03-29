import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { ChangePersonalDetailsService } from 'src/app/logic/auth/change-personal-details.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { PersonalDetailsToUpdate } from 'src/app/shared/models/exports';

import { ChangePersonalDetailsModalComponent } from './change-personal-details-modal.component';

describe('ChangePersonalDetailsModalComponent', () => {
  let component: ChangePersonalDetailsModalComponent;
  let fixture: ComponentFixture<ChangePersonalDetailsModalComponent>;
  let _changePersonalDetailsService: ChangePersonalDetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePersonalDetailsModalComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogResultModule,
        BasicModalModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatProgressBarModule,
        LoadingBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    })
      .overrideComponent(ChangePersonalDetailsModalComponent, {
        set: {
          providers: [
            {
              provide: ChangePersonalDetailsService,
              useClass: MockedChangePersonalDetailsService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChangePersonalDetailsModalComponent);
    component = fixture.componentInstance;
    _changePersonalDetailsService = fixture.debugElement.injector.get(
      ChangePersonalDetailsService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the result dialog and display a successful response if the "success" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');

    spyOnProperty(
      _changePersonalDetailsService,
      'success$',
      'get'
    ).and.returnValue(of('SUCCESS'));

    fixture.detectChanges();

    expect(functionSpy).toHaveBeenCalledOnceWith(
      'Personal Data successfully changed!',
      '',
      true
    );
  });

  it('should call the output dialog and display an error response if the "error" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');

    spyOnProperty(
      _changePersonalDetailsService,
      'error$',
      'get'
    ).and.returnValue(of('Some error'));

    fixture.detectChanges();

    expect(functionSpy).toHaveBeenCalledOnceWith(
      'An error has occurred',
      'Some error',
      false
    );
  });

  it('should call the function "setPersonalDetailsToUpdate" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(
      _changePersonalDetailsService,
      'setPersonalDetailsToUpdate'
    );

    component.formGroup.setValue({
      firstName: 'mock text',
      lastName: 'mock text',
      address: 'mock text',
      aptNumber: 'mock text',
      city: 'mock text',
      state: 'mock text',
      zipCode: 'mock text',
    });

    fixture.detectChanges();

    component.submit();

    expect(functionSpy).toHaveBeenCalledOnceWith({
      firstName: 'mock text',
      lastName: 'mock text',
      address: 'mock text',
      aptNumber: 'mock text',
      city: 'mock text',
      state: 'mock text',
      zipCode: 'mock text',
    });
  });

  it('should show the loading bar when the petition is loading', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(
      _changePersonalDetailsService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
});

class MockedChangePersonalDetailsService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  setPersonalDetailsToUpdate(value: PersonalDetailsToUpdate) {}
}

const dialogMock = {
  close: () => {},
};
