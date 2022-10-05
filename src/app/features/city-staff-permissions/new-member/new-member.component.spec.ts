import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { Observable, of } from 'rxjs';
import { NewMemberComponent } from './new-member.component';
import { StaffUserInput, User } from 'src/app/core/api/API';
import { NewMemberService } from 'src/app/logic/admin/new-member.service';

describe('NewMemberComponent', () => {
  let component: NewMemberComponent;
  let fixture: ComponentFixture<NewMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMemberComponent],
      imports: [
        CommonModule,
        BasicModalModule,
        LoadingBarModule,
        ErrorMsgModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DialogResultModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    })
      .overrideComponent(NewMemberComponent, {
        set: {
          providers: [
            {
              provide: NewMemberService,
              useClass: MockedNewMemberService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NewMemberComponent);
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
class MockedNewMemberService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<User | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  newStaffUser(value: StaffUserInput) {}
}
